import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1649546838236 implements MigrationInterface {
  name = 'init1649546838236';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "gift" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "rating" integer NOT NULL, CONSTRAINT "PK_f91217caddc01a085837ebe0606" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "user" ("id" bigint NOT NULL, "rating" integer NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying, "username" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "user_gift" ("id" SERIAL NOT NULL, "userId" bigint, "giftId" integer, CONSTRAINT "PK_3a92a14b76fa4f84a07ee660888" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "user_gift" ADD CONSTRAINT "FK_92b89cf371c1b1f3d98e1c1983c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "user_gift" ADD CONSTRAINT "FK_6ea92cf0cf539eabf134ff1b81e" FOREIGN KEY ("giftId") REFERENCES "gift"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user_gift" DROP CONSTRAINT "FK_6ea92cf0cf539eabf134ff1b81e"');
    await queryRunner.query('ALTER TABLE "user_gift" DROP CONSTRAINT "FK_92b89cf371c1b1f3d98e1c1983c"');
    await queryRunner.query('DROP TABLE "user_gift"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "gift"');
  }
}
