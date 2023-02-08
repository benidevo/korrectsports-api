import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { modules } from './modules';

@Module({
  imports: [...modules],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, CategoriesRepository],
})
export class PostsModule {}
