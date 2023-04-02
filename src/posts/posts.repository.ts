import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DataSource, Repository } from 'typeorm';
import { generateSlug } from '../utils';
import { Post } from './entities/post.entity';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class PostsRepository extends Repository<Post> {
  constructor(
    private dataSource: DataSource,
    private sharedService: SharedService,
  ) {
    super(Post, dataSource.createEntityManager());
  }

  async findById(id: string) {
    const post = await this.findOne({
      where: { id },
      relations: ['category', 'comments'],
    });
    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.findOne({
      where: { slug },
      relations: ['category'],
    });
    return post;
  }

  async createSlug(title: string) {
    const slug = generateSlug(title);
    const duplicateSlug = await this.findBySlug(slug);
    if (duplicateSlug) {
      return `${slug}-${uuid().substring(0, 8)}`;
    }
    return slug;
  }

  async deleteBanner(banner: string) {
    await this.sharedService.deleteFile(banner);
  }
}
