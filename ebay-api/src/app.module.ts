import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.EBAY_DB_HOST,
      port: parseInt(process.env.EBAY_DB_PORT),
      username: process.env.EBAY_DB_USERNAME,
      password: process.env.EBAY_DB_PASSWORD,
      database: process.env.EBAY_DB_DATABASE_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
