import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from './env.config';
import { User } from 'src/user/entities/user.entity';

export const DBConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [User],
  synchronize: true,
};
