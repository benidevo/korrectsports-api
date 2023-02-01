import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ name: 'first_name', length: 50 })
  firstName: string;

  @Column({ name: 'last_name', length: 50 })
  lastName: string;

  @Column({ unique: true, length: 125 })
  email: string;

  @Column({ length: 8, select: false })
  password: string;

  @Column()
  avatar: string;
}
