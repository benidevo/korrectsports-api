import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsRepository extends Repository<Comment> {
  constructor(dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findById(id: string) {
    const comment = await this.findOne({ where: { id } });
    return comment;
  }
}
