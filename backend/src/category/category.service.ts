import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    await this.categoryRepo.create(createCategoryDto);

    return { success: true };
  }

  findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return this.categoryRepo.find({
      skip: offset,
      take: limit,
      relations: ['books'],
    });
  }

  async findOne(ID: number) {
    return await this.categoryRepo.findOne({
      where: { ID },
      relations: ['books'],
    });
  }

  async update(ID: number, updateCategoryDto: UpdateCategoryDto) {
    const user = await this.categoryRepo.findOneBy({ ID });

    if (!user) {
      throw new BadRequestException('category bot found');
    }

    this.categoryRepo.update(user, updateCategoryDto);
    return { success: true };
  }

  async remove(ID: number) {
    const category = await this.categoryRepo.findOneBy({ ID });

    if (!category) {
      throw new BadRequestException('category not found');
    }

    await this.categoryRepo.remove(category);
    return { success: true };
  }
}
