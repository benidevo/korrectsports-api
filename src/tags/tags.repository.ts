import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsRepository extends Repository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async createOne(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = await this.findOne({ where: { title: createTagDto.title } });
    if (tag) throw new BadRequestException('Tag already exists');

    const newTag = await this.save(createTagDto);
    return newTag;
  }

  async findById(id: string): Promise<Tag> {
    const tags = await this.findOne({ where: { id } });
    return tags;
  }
}
