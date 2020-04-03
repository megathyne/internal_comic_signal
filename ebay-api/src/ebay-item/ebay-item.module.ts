import { Module, HttpModule } from '@nestjs/common';
import { EbayItemService } from './ebay-item.service';
import { EbayItemController } from './ebay-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EbayItemRepository } from './ebay-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EbayItemRepository]), HttpModule],
  providers: [EbayItemService],
  controllers: [EbayItemController],
  exports: [EbayItemService, TypeOrmModule],
})
export class EbayItemModule {}
