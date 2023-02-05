import { Post } from '../../posts/entities/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
