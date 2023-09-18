import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CredentialsDto } from "./dtos/credentials.dto";
import { Serialize } from "../../common/decorators/serialize.decorator";
import { JwtPayloadDto } from "./dtos/jwt-payload.dto";
import { LocalGuard } from "./guards/local.guard";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";
import { Request } from "express";
import { AdminDto } from "../admin/dtos/admin.dto";

@Controller('/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Serialize(AdminDto)
  @Post("/sign-up")
  async signUp(@Body() body: CredentialsDto) {
    return await this.authService.signUp({ ...body, email: body.username });
  }

  @UseGuards(LocalGuard)
  @Serialize(JwtPayloadDto)
  @Post("/sign-in")
  async signIn(@Body() body: CredentialsDto) {
    return await this.authService.signIn({ ...body, email: body.username });
  }

  @UseGuards(RefreshTokenGuard)
  @Serialize(JwtPayloadDto)
  @Get("/token")
  async token(@Req() req: Request) {
    const adminId = req.user['sub'];
    const refreshTokenId = req.user['id'];
    return await this.authService.doRefreshToken(adminId, refreshTokenId);
  }
}
