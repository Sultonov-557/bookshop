import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from './common/config/env.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http/errorHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('bookshop')
    .setDescription('bookshop')
    .setVersion('1.0')
    .addTag('bookshop')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.PORT, () => {
    console.log(`server running on port ${env.PORT}`);
  });
}
bootstrap();
