import { MigrationInterface, QueryRunner } from 'typeorm';

export class riceCollectLink1650198963531 implements MigrationInterface {
  name = 'riceCollectLink1650198963531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "rice_collect_link" ("id" uuid NOT NULL, "chatId" integer NOT NULL, "messageId" integer NOT NULL, "userId" bigint, CONSTRAINT "REL_07e3686aace2c95967dd9c1122" UNIQUE ("userId"), CONSTRAINT "PK_cbce3e5f249469a5fe224760588" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "rice_collect_link" ADD CONSTRAINT "FK_07e3686aace2c95967dd9c11220" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "rice_collect_link" DROP CONSTRAINT "FK_07e3686aace2c95967dd9c11220"');
    await queryRunner.query('DROP TABLE "rice_collect_link"');
  }
}
