import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  
  await app.listen(process.env.GCD_API_SERVER_PORT);

  logger.log(
    `Application listening on port ${process.env.GCD_API_SERVER_PORT}`,
  );
}
bootstrap();
