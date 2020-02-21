import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindingModule } from './finding/finding.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { EbayItermModule } from './ebay-iterm/ebay-iterm.module';
import { EbayItemModule } from './ebay-item/ebay-item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    FindingModule,
    FileUploadModule,
    EbayItermModule,
    EbayItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
