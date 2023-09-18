import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1694874573647 implements MigrationInterface {
  name = "Init1694874573647";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "refresh_tokens"
                             (
                                 "createdAt"      TIMESTAMP NOT NULL DEFAULT now(),
                                 "updatedAt"      TIMESTAMP NOT NULL DEFAULT now(),
                                 "id"             uuid      NOT NULL DEFAULT uuid_generate_v4(),
                                 "isUsed"         boolean   NOT NULL DEFAULT false,
                                 "expirationDate" TIMESTAMP NOT NULL,
                                 "adminId"        uuid,
                                 CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "admins"
                             (
                                 "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "id"        uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "email"     character varying NOT NULL,
                                 "password"  character varying NOT NULL,
                                 CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"),
                                 CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TYPE "public"."trains_frequency_enum" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`);
    await queryRunner.query(`CREATE TABLE "trains"
                             (
                                 "createdAt"          TIMESTAMP                              NOT NULL DEFAULT now(),
                                 "updatedAt"          TIMESTAMP                              NOT NULL DEFAULT now(),
                                 "id"                 uuid                                   NOT NULL DEFAULT uuid_generate_v4(),
                                 "trainNumber"        character varying                      NOT NULL,
                                 "trainRoute"         character varying                      NOT NULL,
                                 "frequency"          "public"."trains_frequency_enum" array NOT NULL DEFAULT '{Monday,Tuesday,Wednesday,Thursday,Friday}',
                                 "startStation"       character varying                      NOT NULL,
                                 "startArrivalTime"   TIMESTAMP                              NOT NULL,
                                 "startDepartureTime" TIMESTAMP                              NOT NULL,
                                 "endStation"         character varying                      NOT NULL,
                                 "endArrivalTime"     TIMESTAMP                              NOT NULL,
                                 "endDepartureTime"   TIMESTAMP                              NOT NULL,
                                 "isActive"           boolean                                NOT NULL DEFAULT false,
                                 CONSTRAINT "UQ_8c4065a87718f782d202cafebb2" UNIQUE ("trainNumber"),
                                 CONSTRAINT "PK_e4a77c477e29608e7d17d17fb4f" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "refresh_tokens"
        ADD CONSTRAINT "FK_766ab81fa68d15204df19f83370" FOREIGN KEY ("adminId") REFERENCES "admins" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_tokens"
        DROP CONSTRAINT "FK_766ab81fa68d15204df19f83370"`);
    await queryRunner.query(`DROP TABLE "trains"`);
    await queryRunner.query(`DROP TYPE "public"."trains_frequency_enum"`);
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
  }

}
