import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async login(body: LoginAuthDto) {
    const { username, password } = body;

    if (!username || !password) {
      throw new BadRequestException('username or password not given');
    }

    const user: User = (
      await this.userRepo.find({
        where: { username },
      })
    )[0];

    return { success: true, user };
  }

  async register(body: RegisterAuthDto) {
    const { username, password, telegramID } = body;

    console.log(body);
    const userExists: boolean = await this.userRepo.exist({
      where: { username, telegramID },
    });
    console.log(userExists);

    if (userExists) {
      throw new NotFoundException('username already taken');
    }

    const user = this.userRepo.create({
      username,
      password: password,
      telegramID,
    });

    await this.userRepo.save(user);

    return { success: true, user };
  }

  async verify(telegramID: string) {
    const user = await this.userRepo.findOneBy({ telegramID });

    if (!user) {
      return { success: false };
    }
    return { success: true, user };
  }
}
