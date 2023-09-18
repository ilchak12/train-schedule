import { Expose } from "class-transformer";
import { IsDate, IsDateString, IsString } from "class-validator";

export class AdminDto {
  @Expose()
  @IsString()
  id: string

  @Expose()
  @IsString()
  email: string

  @IsString()
  password: string

  @Expose()
  @IsDateString()
  createdAt: Date

  @Expose()
  @IsDateString()
  updatedAt: Date
}