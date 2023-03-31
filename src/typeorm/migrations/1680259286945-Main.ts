import { MigrationInterface, QueryRunner } from 'typeorm';

export class Main1680259286945 implements MigrationInterface {
  name = 'Main1680259286945';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`banner\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`video_link\` varchar(255) NOT NULL DEFAULT '', \`category_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_cd1bddce36edc3e766798eab37\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL DEFAULT '', UNIQUE INDEX \`IDX_9f16dbbf263b0af0f03637fa7b\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tag\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ea660f2baf9c3f3141d7c2ef53\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(50) NOT NULL, \`last_name\` varchar(50) NOT NULL, \`email\` varchar(125) NOT NULL, \`password\` varchar(8) NOT NULL, \`avatar\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_8aa21186314ce53c5b61a0e8c93\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_aa385b9808cc7a076ae65ace356\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_388636ba602c312da6026dc9dbc\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_388636ba602c312da6026dc9dbc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_aa385b9808cc7a076ae65ace356\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_8aa21186314ce53c5b61a0e8c93\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ea660f2baf9c3f3141d7c2ef53\` ON \`tag\``,
    );
    await queryRunner.query(`DROP TABLE \`tag\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_9f16dbbf263b0af0f03637fa7b\` ON \`category\``,
    );
    await queryRunner.query(`DROP TABLE \`category\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_cd1bddce36edc3e766798eab37\` ON \`post\``,
    );
    await queryRunner.query(`DROP TABLE \`post\``);
  }
}
