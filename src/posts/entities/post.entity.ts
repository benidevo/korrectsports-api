import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Comment } from '../modules/comments/entities/comment.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column()
  banner: string;

  @Column()
  content: string;

  @Column({ name: 'video_link', default: '' })
  videoLink: string;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];
}
