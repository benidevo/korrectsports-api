import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JWTAuthGuard } from '../auth/jwt-auth-guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  // retrieve recent=true from query params, but make it optional
  @Get()
  findAll(
    @Query('recent') recent: boolean,
    @Query('q') q: string,
    @Query('categId') categId: string,
  ) {
    return this.postsService.findAll(recent, q, categId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
