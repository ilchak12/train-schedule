import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException, NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { HashService } from "../hash/hash.service";
import { Credentials } from "./types";
import { TokenService } from "../token/token.service";
import { ConfigService } from "@nestjs/config";
import { JwtPayloadDto } from "./dtos/jwt-payload.dto";
import { RefreshTokenRepository } from "./refresh-token.repository";
import { Admin } from "../admin/admin.entity";
import { RefreshToken } from "./refresh-token.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly config: ConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {
  }

  async signUp(credentials: Credentials) {
    const admin = await this.adminService.findByEmail(credentials.email);

    if (admin)
      throw new ConflictException(`Admin already exists`);

    const newAdmin = {
      ...credentials,
      password: await this.hashService.hash(credentials.password)
    };

    return await this.adminService.save(newAdmin);
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.adminService.findByEmail(email);
    if (!admin)
      throw new UnauthorizedException("Invalid email or password");

    if (!await this.hashService.compare(password, admin.password))
      throw new UnauthorizedException("Invalid email or password");

    return admin;
  }

  async getJWT(admin: Admin) {
    const jwtAccessLifetimeHours = parseInt(this.config.getOrThrow<string>("JWT_ACCESS_LIFETIME_HOURS"));
    const jwtRefreshLifetimeHours = parseInt(this.config.getOrThrow<string>("JWT_REFRESH_LIFETIME_HOURS"));
    const expAccess = 60 * 60 * jwtAccessLifetimeHours;

    const payloadAccess = { sub: admin.id, email: admin.email };
    const accessToken = await this.tokenService.generateJWT(
      payloadAccess,
      this.config.getOrThrow<string>("JWT_ACCESS_SECRET"),
      `${jwtAccessLifetimeHours}h`
    );

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + jwtRefreshLifetimeHours);
    const savedRefreshToken = await this.saveRefreshToken({
      admin: admin,
      expirationDate: expirationDate
    });

    const payloadRefresh = { sub: admin.id, id: savedRefreshToken.id };
    const refreshToken = await this.tokenService.generateJWT(
      payloadRefresh,
      this.config.getOrThrow<string>("JWT_REFRESH_SECRET"),
      `${jwtRefreshLifetimeHours}h`
    );

    const jwtPayload: JwtPayloadDto = {
      access_token: accessToken,
      refresh_token: refreshToken,
      exp: expAccess,
      sub: admin.id
    };

    return jwtPayload;
  }

  async signIn(credentials: Credentials) {
    const admin = await this.validateAdmin(credentials.email, credentials.password);
    return await this.getJWT(admin);
  }

  async saveRefreshToken(admin: Partial<RefreshToken>) {
    const entity = this.refreshTokenRepository.create(admin);
    return await this.refreshTokenRepository.save(entity);
  }

  async findRefreshTokenById(id: string) {
    if (!id) return null;
    return await this.refreshTokenRepository.findOne({ where: { id } });
  }

  async findRefreshTokenByIdOrThrowError(id: string, errorFunc: () => void) {
    const entity = await this.findRefreshTokenById(id);
    if (!entity)
      errorFunc();

    return entity;
  }

  async updateRefreshToken(id: string, attrs: Partial<RefreshToken>) {
    if (!id)
      throw new InternalServerErrorException(`Id is ${id}`);

    const refreshToken = await this.findRefreshTokenById(id);
    Object.assign(refreshToken, attrs);
    return await this.refreshTokenRepository.save(refreshToken);
  }

  async findValidRefreshToken(id: string, adminId: string) {
    if (!id || !adminId) return null;
    return await this.refreshTokenRepository.findValidRefreshToken(id, adminId);
  }

  async doRefreshToken(adminId: string, refreshTokenId: string) {
    const refreshToken = await this.findValidRefreshToken(refreshTokenId, adminId);
    if (!refreshToken)
      throw new UnauthorizedException(`Refresh token not found`);

    refreshToken.isUsed = true;
    refreshToken.expirationDate = new Date();

    await this.updateRefreshToken(refreshToken.id, refreshToken);

    const admin = await this.adminService.findByIdOrThrowError(
      adminId,
      () => {
        throw new NotFoundException(`Admin not found`);
      }
    );

    return this.getJWT(admin);
  }
}
