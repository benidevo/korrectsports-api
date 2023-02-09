import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Post } from '../../../../posts/entities/post.entity';
import { BaseEntity } from '../../../../typeorm';

@Entity()
export class Attachment extends BaseEntity {
  @Column()
  value: string;

  @Column({ default: false })
  isVideo: boolean;

  @ManyToOne(() => Post, (post) => post.attachments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
