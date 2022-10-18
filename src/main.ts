import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'

//O pacote ValidationPipe está sendo habilitado em todas as Requisições HTTP, ou seja, o Validation checará em todas as Requisições, cuja a Classe Entidade associada possua validações implementadas nos Atributos, no momento em que os dados forem enviados no Corpo de uma Requisição.

  app.useGlobalPipes(new ValidationPipe());

//O "enableCors está dizendo que aceita requisições de qualquer domínio."
  app.enableCors();

  await app.listen(4000);
}
bootstrap();
