import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('boostrap');

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Comic Signal Ebay API')
    .setDescription('Ebay API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.EBAY_API_SERVER_PORT);

  logger.log(`Application listening on port ${process.env.EBAY_API_SERVER_PORT}`);
}
bootstrap();
