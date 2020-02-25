import { Controller, Logger, Get, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { GetEbayItemFilterDto } from './dto/get-ebay-item-filter.dto';
import { EbayItemService } from './ebay-item.service';

@Controller('ebay-item')
export class EbayItemController {
  private logger = new Logger('EbayItemController');

  constructor(private readonly ebayItemService: EbayItemService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: 'series', type: String, required: false })
  @ApiQuery({ name: 'issue', type: String, required: false })
  get(@Query() filterDto: GetEbayItemFilterDto) {
    this.logger.log(`Retrieving ebay items. Filters: ${JSON.stringify(filterDto)}`);
    return this.ebayItemService.getEbayItems(filterDto);
  }
}
