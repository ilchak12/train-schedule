import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from "../admin/admin.module";
import { HashModule } from "../hash/hash.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LocalStrategy } from "./strategies/local.strategy";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";
import { TokenModule } from "../token/token.module";
import { RefreshTokenRepository } from "./refresh-token.repository";

@Module({
  imports: [
    PassportModule,
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       secret: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
    //       signOptions: {expiresIn: `${config.getOrThrow<string>('JWT_ACCESS_LIFETIME_HOURS')}h`},
    //     }
    //   }
    // }),
    JwtModule.register({}),
    AdminModule,
    HashModule,
    TokenModule,
  ],
  providers: [AuthService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy, RefreshTokenRepository],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
