import { MigrationInterface, QueryRunner } from 'typeorm';

export class tool1650060815876 implements MigrationInterface {
  name = 'tool1650060815876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "tool" ("id" SERIAL NOT NULL, "icon" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_3bf5b1016a384916073184f99b7" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "user_tool" ("id" SERIAL NOT NULL, "userId" bigint, "toolId" integer, CONSTRAINT "PK_54af7a95c6d3f693c0013ce5a91" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "user_tool" ADD CONSTRAINT "FK_5e798b2a98ed5f30d3244a73105" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "user_tool" ADD CONSTRAINT "FK_1b02cf3bca5594ec7520fead2c8" FOREIGN KEY ("toolId") REFERENCES "tool"("id") ON DELETE CASCADE ON UPDATE NO ACTION');

    await queryRunner.query(`
      INSERT INTO "tool" ("icon", "name", "description", "price") VALUES 
      ('🪓', 'axe', 'Топор', 500),
      ('⛏', 'pickaxe', 'Кирка', 750),
      ('🗡', 'sword', 'Меч', 1000),
      ('🔪', 'knife', 'Нож', 300)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user_tool" DROP CONSTRAINT "FK_1b02cf3bca5594ec7520fead2c8"');
    await queryRunner.query('ALTER TABLE "user_tool" DROP CONSTRAINT "FK_5e798b2a98ed5f30d3244a73105"');
    await queryRunner.query('DROP TABLE "user_tool"');
    await queryRunner.query('DROP TABLE "tool"');
  }
}
