import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from '../../../posts/posts.repository';
import { SharedService } from '../../../shared/shared.service';
import StorageProvider from '../../../shared/providers/storage.provider';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentsRepository,
    PostsRepository,
    SharedService,
    StorageProvider,
  ],
})
export class CommentsModule {}
