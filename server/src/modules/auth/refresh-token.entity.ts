import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../../common/entities/base.entity";
import { Admin } from "../admin/admin.entity";

@Entity({name: "refresh_tokens"})
export class RefreshToken extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({default: false})
  isUsed: boolean

  @Column()
  expirationDate: Date

  @ManyToOne(
    () => Admin,
    (admin) => admin.refreshTokens,
    {onDelete: "CASCADE"}
  )
  admin: Admin
}