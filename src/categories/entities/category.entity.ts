import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column({ default: '' })
  description: string;
}
