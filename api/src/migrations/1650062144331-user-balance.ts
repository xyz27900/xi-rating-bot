import { MigrationInterface, QueryRunner } from 'typeorm';

export class userBalance1650062144331 implements MigrationInterface {
  name = 'userBalance1650062144331';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD "balance" integer NOT NULL DEFAULT \'300\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "balance"');
  }
}
