import { Controller, Logger, Get, UseInterceptors, ClassSerializerInterceptor, Query, Param } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { GetEbayItemFilterDto } from './dto/get-ebay-item-filter.dto';
import { EbayItemService } from './ebay-item.service';
import { EbayItem } from './ebay-item.entity';

@Controller('ebay-item')
export class EbayItemController {
  private logger = new Logger('EbayItemController');

  constructor(private readonly ebayItemService: EbayItemService) {}
  //This returns a list of completed items
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: 'series', type: String, required: false })
  @ApiQuery({ name: 'issue', type: String, required: false })
  get(@Query() filterDto: GetEbayItemFilterDto): Promise<EbayItem[]> {
    this.logger.log(`Retrieving ebay items. Filters: ${JSON.stringify(filterDto)}`);
    return this.ebayItemService.getEbayItems(filterDto);
  }
  //This returns a list of completed items by the ebay itemID numbers in a string
  @Get('ids')
  @UseInterceptors(ClassSerializerInterceptor)
  getByIds(@Query('ebayItemIds') ebayItemIds: string[]): Promise<EbayItem[]> {
    this.logger.log(`Retrieving ebay items by ebayItemIds: ${JSON.stringify(ebayItemIds)}`);
    return this.ebayItemService.getByIds(ebayItemIds);
  }
  //This returns a single completed eBay item by the itemID
  @Get('item/:id')
  getItemById(@Param('id') id: string): Promise<any> {
    this.logger.log(`Retrieving single ebay item by ebayID: ID:  ${JSON.stringify(id)}`);
    return this.ebayItemService.getItemById(id);
  }
}
