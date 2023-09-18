import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from "./setup-app";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  await app.listen(process.env.PORT);
  console.log(`App run on port: ${process.env.PORT}`)
}
bootstrap();
