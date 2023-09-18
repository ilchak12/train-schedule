import { IsBoolean, IsNotEmpty } from "class-validator";

export class ChangeTrainStatusDto {
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}