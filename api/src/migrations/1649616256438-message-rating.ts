import { MigrationInterface, QueryRunner } from 'typeorm';

export class messageRating1649616256438 implements MigrationInterface {
  name = 'messageRating1649616256438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "message_rating" ("id" SERIAL NOT NULL, "messageId" bigint NOT NULL, "userId" bigint, CONSTRAINT "PK_10664e89813fb3afabc107f2870" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "message_rating" ADD CONSTRAINT "FK_9c38e9f5a34dbadb182e80d27cf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "message_rating" DROP CONSTRAINT "FK_9c38e9f5a34dbadb182e80d27cf"');
    await queryRunner.query('DROP TABLE "message_rating"');
  }
}
