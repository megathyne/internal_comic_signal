import { Controller, Logger, Get } from '@nestjs/common';
import { EbayItemService } from './ebay-item.service';

@Controller('ebay-item')
export class EbayItemController {
  private logger = new Logger('EbayItemController');

  constructor(private readonly ebayItemService: EbayItemService) {}

  @Get()
  get() {
    this.logger.log(`Retrieving and starting process to add to EBI Repository`);
    return this.ebayItemService.createEbayItem();
  }
}
