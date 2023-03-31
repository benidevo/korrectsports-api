import { User } from '../../users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed16890258872995 implements MigrationInterface {
  name = 'Seed16890258872995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        firstName: 'David',
        lastName: 'Idewor',
        email: 'benidevoo@gmail.com',
        password: 'password',
        avatar: 'https://i.pravatar.cc/150?img=1',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE * FROM user WHERE email = 'benidevoo@gmail.com'`,
    );
  }
}
