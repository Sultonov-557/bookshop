import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const {
      author,
      category: categoryName,
      filePath,
      name,
      price,
    } = createBookDto;

    let category = await this.categoryRepo.findOneBy({ name: categoryName });
    if (!category) {
      category = await this.categoryRepo.create({ name: categoryName });
      await this.categoryRepo.save(category);
    }

    const book = await this.bookRepo.create({
      author,
      categorys: [category],
      filePath,
      name,
      price,
    });

    this.bookRepo.save(book);

    return { success: true };
  }

  async findAll(page: number, limit: number, categoryID?: number) {
    const offset = (page - 1) * limit;

    const category = await this.categoryRepo.findOneBy({ ID: categoryID });

    return await this.bookRepo.find({
      skip: offset,
      take: limit,
      where: { categorys: category },
    });
  }

  async findOne(ID: number) {
    return await this.bookRepo.findOneBy({ ID });
  }

  async update(ID: number, updateBookDto: UpdateBookDto) {
    const user = await this.bookRepo.findOneBy({ ID });

    if (!user) {
      throw new BadRequestException('book bot found');
    }

    this.bookRepo.update(user, updateBookDto);
    return { success: true };
  }

  async remove(ID: number) {
    const book = await this.bookRepo.findOneBy({ ID });

    if (!book) {
      throw new BadRequestException('book not found');
    }

    await this.bookRepo.remove(book);
    return { success: true };
  }
}
