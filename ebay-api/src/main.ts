import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('boostrap');

  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.EBAY_API_SERVER_PORT);

  logger.log(`Application listening on port ${process.env.EBAY_API_SERVER_PORT}`);
}
bootstrap();
