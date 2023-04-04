import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropAttachment1680647134784 implements MigrationInterface {
  name = 'DropAttachment1680647134784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_aa385b9808cc7a076ae65ace356\``,
    );

    await queryRunner.query(`DROP TABLE \`attachment\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`attachment\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`value\` varchar(255) NOT NULL, \`isVideo\` tinyint NOT NULL DEFAULT 0, \`post_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_aa385b9808cc7a076ae65ace356\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
