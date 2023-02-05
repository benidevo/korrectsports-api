import { MigrationInterface, QueryRunner } from 'typeorm';

export class Posts1675629670865 implements MigrationInterface {
  name = 'Posts1675629670865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`banner\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`video_link\` varchar(255) NOT NULL DEFAULT '', \`category_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_cd1bddce36edc3e766798eab37\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
      `DROP INDEX \`IDX_cd1bddce36edc3e766798eab37\` ON \`post\``,
    );
    await queryRunner.query(`DROP TABLE \`post\``);
  }
}
