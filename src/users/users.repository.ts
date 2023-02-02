import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<User> {
    const user = await this.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getPassword(id: string): Promise<string> {
    const user = await this.findOne({ where: { id }, select: ['password'] });
    if (!user) throw new BadRequestException('User not found');
    return user.password;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.findOne({
      where: { email },
      select: ['id', 'password'],
    });
    return user;
  }
}
