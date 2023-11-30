import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './common/config/db.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(DBConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
