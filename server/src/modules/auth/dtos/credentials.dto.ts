import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}