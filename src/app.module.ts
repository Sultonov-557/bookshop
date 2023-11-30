import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './common/config/db.config';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot(DBConfig), UserModule, BookModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
