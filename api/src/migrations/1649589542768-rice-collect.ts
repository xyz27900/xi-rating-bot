import { MigrationInterface, QueryRunner } from 'typeorm';

export class riceCollect1649589542768 implements MigrationInterface {
  name = 'riceCollect1649589542768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "rice_collect" ("id" SERIAL NOT NULL, "nextTime" TIMESTAMP NOT NULL, "userId" bigint, CONSTRAINT "REL_7669ce4426dd76b86984ecb875" UNIQUE ("userId"), CONSTRAINT "PK_7503bbce3813711b25b8491967e" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "rice_collect" ADD CONSTRAINT "FK_7669ce4426dd76b86984ecb875a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "rice_collect" DROP CONSTRAINT "FK_7669ce4426dd76b86984ecb875a"');
    await queryRunner.query('DROP TABLE "rice_collect"');
  }
}
