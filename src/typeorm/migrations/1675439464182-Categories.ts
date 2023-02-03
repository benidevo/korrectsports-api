import { MigrationInterface, QueryRunner } from 'typeorm';

export class Categories1675439464182 implements MigrationInterface {
  name = 'Categories1675439464182';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL DEFAULT '', UNIQUE INDEX \`IDX_9f16dbbf263b0af0f03637fa7b\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_9f16dbbf263b0af0f03637fa7b\` ON \`category\``,
    );
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
