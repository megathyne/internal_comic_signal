import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindingModule } from './finding/finding.module';
import { FileUploadModule } from './file-upload/file-upload.module';
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
    EbayItemModule,
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
