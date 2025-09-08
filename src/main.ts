import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { config } from './common';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './common/error/duplicate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({});

  app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(config.PORT, () => {
    console.log(
      `Server is up and running on ${process.env.PORT || 4000} port!`,
    );
  });
}
bootstrap();
