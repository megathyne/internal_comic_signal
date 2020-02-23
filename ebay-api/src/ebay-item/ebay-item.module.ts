import { Module } from '@nestjs/common';
import { EbayItemService } from './ebay-item.service';
import { EbayItemController } from './ebay-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EbayItemRepository } from './ebay-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EbayItemRepository])],
  providers: [EbayItemService],
  controllers: [EbayItemController]
})
export class EbayItemModule {}
