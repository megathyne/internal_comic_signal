import { Module } from '@nestjs/common';
import { EbayItemService } from './ebay-item.service';
import { EbayItemController } from './ebay-item.controller';

@Module({
  providers: [EbayItemService],
  controllers: [EbayItemController]
})
export class EbayItemModule {}
