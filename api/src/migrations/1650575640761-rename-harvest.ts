import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameHarvest1650575640761 implements MigrationInterface {
  name = 'renameHarvest1650575640761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "rice_collect" RENAME TO "harvest"');
    await queryRunner.query('ALTER TABLE "rice_collect_link" RENAME TO "harvest_link"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "harvest" RENAME TO "rice_collect"');
    await queryRunner.query('ALTER TABLE "harvest_link" RENAME TO "rice_collect_link"');
  }
}
