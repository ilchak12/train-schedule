import { DataSource, Repository } from "typeorm";
import { Admin } from "./admin.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminRepository extends Repository<Admin>{
  constructor(
    private dataSource: DataSource
  ) {
    super(Admin, dataSource.createEntityManager());
  }
}