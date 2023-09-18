import { INestApplication, ValidationPipe } from "@nestjs/common";

export const setupApp = (app: INestApplication) => {
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
}