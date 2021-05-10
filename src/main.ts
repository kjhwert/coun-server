import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerOptions } from './swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { NotAcceptableFilter } from './filters/not-acceptable.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const swagger = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('documents', app, swagger);

  app.useGlobalFilters(new NotAcceptableFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use('/public', express.static(join(__dirname, '..', 'public')));
  await app.listen(3001);
}
bootstrap();
