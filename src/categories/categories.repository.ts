import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Category> {
    const category = await this.findOne({ where: { id } });
    return category;
  }

  async createOne(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.findOne({
      where: { title: createCategoryDto.title },
    });
    if (category) throw new BadRequestException('Category already exists');

    const newCategory = await this.save(createCategoryDto);
    return newCategory;
  }
}
