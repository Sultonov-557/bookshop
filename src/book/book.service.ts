import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  async create(createBookDto: CreateBookDto) {
    await this.bookRepo.create(createBookDto);

    return { success: true };
  }

  findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return this.bookRepo.find({
      skip: offset,
      take: limit,
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
