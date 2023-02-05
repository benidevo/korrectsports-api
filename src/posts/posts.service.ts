import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly categoryRepository: CategoriesRepository,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { categoryId, title } = createPostDto;
    delete createPostDto.categoryId;
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) throw new NotFoundException('Category not found');
    const slug = await this.postRepository.createSlug(title);

    const post = this.postRepository.create(createPostDto);
    post.category = category;
    post.slug = slug;
    await this.postRepository.save(post);
    return post;
  }

  async findAll() {
    const posts = await this.postRepository.find();
    return posts;
  }

  async findOne(id: string) {
    const post = await this.postRepository.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.postRepository.findBySlug(slug);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    if (updatePostDto?.title) {
      const slug = await this.postRepository.createSlug(updatePostDto.title);
      updatePostDto.slug = slug;
    }

    if (updatePostDto?.categoryId) {
      const category = await this.categoryRepository.findById(
        updatePostDto.categoryId,
      );
      if (!category) throw new NotFoundException('Category not found');
      delete updatePostDto.categoryId;

      await this.postRepository.update(id, {
        ...updatePostDto,
        category: category,
      });
      return;
    }

    await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: string) {
    await this.postRepository.delete(id);
  }
}
