import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";

config({path: `${__dirname}/../../../.env`});
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow<string>('DB_HOST'),
  port: configService.getOrThrow<number>('DB_PORT'),
  username: configService.getOrThrow<string>('DB_USERNAME'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.getOrThrow<string>('DB_DATABASE'),
  entities: [__dirname + '/../**/*.entity.js'],
  migrations: [`${__dirname}/../../migrations/**`],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;