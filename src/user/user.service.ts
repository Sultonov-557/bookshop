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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(ID: number) {
    const userExist = await this.userRepo.exist({ where: { ID } });

    if(!userExist){
      throw new BadRequestException("user not found")
    }

    
  }
}
