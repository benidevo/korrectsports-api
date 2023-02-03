import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(private readonly tagRepository: TagsRepository) {}

  async create(createTagDto: CreateTagDto) {
    const tag = await this.tagRepository.createOne(createTagDto);
    return tag;
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.tagRepository.find();
    return tags;
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) throw new BadRequestException('Tag not found');

    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<void> {
    await this.tagRepository.update(id, updateTagDto);
  }

  async remove(id: string) {
    await this.tagRepository.delete(id);
  }
}
