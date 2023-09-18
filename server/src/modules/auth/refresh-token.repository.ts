import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RefreshToken } from "./refresh-token.entity";

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken>{
  constructor(
    private dataSource: DataSource
  ) {
    super(RefreshToken, dataSource.createEntityManager());
  }

  async findValidRefreshToken(
    id: string, adminId: string
  ) {
    return await this.manager.createQueryBuilder()
      .select("rt")
      .from(RefreshToken, "rt")
      .where("rt.id = :id", {id: id})
      .andWhere("rt.adminId = :adminId", {adminId: adminId})
      .andWhere("rt.isUsed = :isUsed", {isUsed: false})
      .andWhere("rt.expirationDate >= :now", {now: new Date()})
      .getOne();
  }
}