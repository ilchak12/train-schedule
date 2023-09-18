import { Expose } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDateString, IsString } from "class-validator";
import { Day } from "../../../common/enums/day.enum";

export class TrainDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  trainNumber: string;

  @Expose()
  @IsString()
  trainRoute: string;

  @Expose()
  @IsArray()
  frequency: Day[];

  @Expose()
  @IsString()
  startStation: string;

  @Expose()
  @IsDateString()
  startArrivalTime: Date;

  @Expose()
  @IsDateString()
  startDepartureTime: Date;

  @Expose()
  @IsString()
  endStation: string;

  @Expose()
  @IsDateString()
  endArrivalTime: Date;

  @Expose()
  @IsDateString()
  endDepartureTime: Date;

  @Expose()
  @IsBoolean()
  isActive: boolean;

  @Expose()
  @IsDateString()
  createdAt: Date

  @Expose()
  @IsDateString()
  updatedAt: Date
}