import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsRepository } from './attachments.repository';
import { PostsRepository } from '../../../posts/posts.repository';

@Module({
  controllers: [AttachmentsController],
  providers: [AttachmentsService, AttachmentsRepository, PostsRepository],
})
export class AttachmentsModule {}
