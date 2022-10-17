import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'
//O pacote ValidationPipe ele está sendo habilitado na aplicação para que todas as requisições HTTP para checar se as requisições batem com a classe associada.
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(4000);
}
bootstrap();
