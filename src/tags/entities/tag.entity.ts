import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../typeorm';

@Entity()
export class Tag extends BaseEntity {
  @Column({ unique: true })
  title: string;
}
