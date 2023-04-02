import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsRepository } from './attachments.repository';
import { PostsRepository } from '../../../posts/posts.repository';
import StorageProvider from '../../../shared/providers/storage.provider';
import { SharedService } from '../../../shared/shared.service';

@Module({
  controllers: [AttachmentsController],
  providers: [
    AttachmentsService,
    AttachmentsRepository,
    PostsRepository,
    SharedService,
    StorageProvider,
  ],
})
export class AttachmentsModule {}
