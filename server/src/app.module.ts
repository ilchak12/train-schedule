import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainModule } from './modules/train/train.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./configs/db.config";
import { HashModule } from './modules/hash/hash.module';
import { ConfigModule } from "@nestjs/config";
import { TokenModule } from './modules/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    TrainModule,
    AdminModule,
    AuthModule,
    HashModule,
    TokenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
