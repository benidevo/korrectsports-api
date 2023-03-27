import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoriesRepository.createOne(
      createCategoryDto,
    );
    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find({
      relations: ['posts'],
    });
    categories.forEach((category) => {
      category.postCount = category.posts.length;
      delete category.posts;
    });
    return categories;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) throw new BadRequestException('Category not found');
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.categoriesRepository.update(id, updateCategoryDto);
  }

  async remove(id: string): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
