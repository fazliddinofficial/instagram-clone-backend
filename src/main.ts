import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({});

  await app.listen(config.PORT, () => {
    console.log(
      `Jarvis: Server is up and running on ${process.env.PORT || 4000} port!`,
    );
  });
}
bootstrap();
