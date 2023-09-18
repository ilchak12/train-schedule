import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from "./admin.repository";

@Module({
  providers: [AdminRepository, AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
