import { MigrationInterface, QueryRunner } from 'typeorm';

export class riceCollectLinkSubjects1650364588865 implements MigrationInterface {
  name = 'riceCollectLinkSubjects1650364588865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "rice_collect_link" ADD "subjects" text NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "rice_collect_link" DROP COLUMN "subjects"');
  }
}
