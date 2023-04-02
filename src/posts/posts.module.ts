import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { modules } from './modules';
import { SharedService } from '../shared/shared.service';
import StorageProvider from '../shared/providers/storage.provider';

@Module({
  imports: [...modules],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
    CategoriesRepository,
    SharedService,
    StorageProvider,
  ],
})
export class PostsModule {}
