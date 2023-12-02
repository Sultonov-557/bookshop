import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { telegramID, username } = createUserDto;

    const usernameExist = await this.userRepo.exist({
      where: { username },
    });

    if (usernameExist) {
      throw new BadRequestException('username already exists');
    }

    const user = this.userRepo.create({ telegramID, username });
    await this.userRepo.save(user);
    return { success: true };
  }

  findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return this.userRepo.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(ID: number) {
    return await this.userRepo.findOneBy({ ID });
  }

  async update(ID: number, updateUserDto: UpdateUserDto) {
    const { telegramID, username } = updateUserDto;

    const user = await this.userRepo.findOneBy({ ID });

    user.username = username;
    user.telegramID = telegramID;

    await this.userRepo.save(user);
    return { success: true };
  }

  async remove(ID: number) {
    const user = await this.userRepo.findOneBy({ ID });

    if (!user) {
      throw new BadRequestException('user not found');
    }

    await this.userRepo.remove(user);
    return { success: true };
  }
}
