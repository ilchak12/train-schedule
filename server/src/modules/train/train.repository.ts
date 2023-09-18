import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Train } from "./train.entity";

@Injectable()
export class TrainRepository extends Repository<Train>{
  constructor(
    private dataSource: DataSource
  ) {
    super(Train, dataSource.createEntityManager());
  }
}