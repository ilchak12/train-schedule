import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';
import { TrainRepository } from "./train.repository";

@Module({
  providers: [TrainService, TrainRepository],
  controllers: [TrainController]
})
export class TrainModule {}
