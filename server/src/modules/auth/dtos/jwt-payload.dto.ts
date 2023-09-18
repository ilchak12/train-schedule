import { IsJWT, IsNumber, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class JwtPayloadDto {
  @IsJWT()
  @Expose()
  access_token: string

  @IsJWT()
  @Expose()
  refresh_token: string

  @IsNumber()
  @Expose()
  exp: number

  @IsString()
  @Expose()
  sub: string
}