import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';
import { Repository } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Saved } from './entities/saved.entity';

@Injectable()
export class SavedService {
  constructor(
    @InjectRepository(Saved) private saveRepo: Repository<Saved>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createSavedDto: CreateSavedDto) {
    const { bookID, userID } = createSavedDto;

    const book = await this.bookRepo.findOneBy({ ID: bookID });
    const user = await this.userRepo.findOneBy({ ID: userID });

    if (!user || !book) {
      throw new BadRequestException('book or user not found');
    }

    const save = this.saveRepo.create({ book, user });
    await this.saveRepo.save(save);
    return { success: true };
  }

  async findAll(userID: number) {
    const saves = await this.saveRepo.find({
      where: { user: { ID: userID } },
      relations: ['user', 'book'],
    });

    return saves;
  }

  async findOne(ID: number) {
    const save = await this.saveRepo.findOne({
      where: { ID },
      relations: ['user', 'book'],
    });
    return save;
  }

  async remove(ID: number) {
    const save = await this.saveRepo.findOne({
      where: { ID },
      relations: ['user', 'book'],
    });

    await this.saveRepo.delete(save);
  }
}
