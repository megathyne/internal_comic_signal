import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindingModule } from './finding/finding.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { EbayItemModule } from './ebay-item/ebay-item.module';
import * as ormconfig from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), FindingModule, FileUploadModule, EbayItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
