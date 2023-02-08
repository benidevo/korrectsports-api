import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from '../../../posts/posts.repository';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  async create(createCommentDto: CreateCommentDto, postId: string) {
    const post = await this.postRepository.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const comment = await this.commentRepository.save({
      ...createCommentDto,
      post,
    });
    return comment;
  }

  async findAll() {
    const comments = await this.commentRepository.find();
    return comments;
  }

  async findOne(id: string) {
    const comment = await this.commentRepository.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async remove(id: string) {
    await this.commentRepository.delete(id);
  }
}
