import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async generateJWT(payload: any, secret: string, expiresIn: string | number) {
    return await this.jwtService.signAsync(
      payload,
      {
        secret: secret,
        expiresIn: expiresIn
      }
    );
  }
}
