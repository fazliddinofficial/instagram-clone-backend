import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4000, ()=> {
    console.log(`Jarvis: Server is up and running on ${process.env.PORT || 4000} port!`)
  });
}
bootstrap();
