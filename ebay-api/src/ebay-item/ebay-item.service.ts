import { Injectable, Logger } from '@nestjs/common';
import { EbayItemRepository } from './ebay-item.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../finding/dto/findCompletedItemsResponse.dto';
import { CreateEbayItemDto } from './dto/create-ebay-item.dto';
import { GetEbayItemFilterDto } from './dto/get-ebay-item-filter.dto';
import { EbayItem } from './ebay-item.entity';

@Injectable()
export class EbayItemService {
  private logger = new Logger('EbayItemService');
  constructor(@InjectRepository(EbayItemRepository) private ebayItemRepository: EbayItemRepository) {}

  async dataMapper(rawEbayItem: Item): Promise<CreateEbayItemDto> {
    const {
      itemId,
      title,
      globalId,
      viewItemURL,
      galleryURL,
      primaryCategory,
      sellingStatus,
      location,
      country,
      shippingInfo,
      listingInfo,
    } = rawEbayItem;

    try {
      const createEbayItemDto: CreateEbayItemDto = {
        itemId: itemId[0],
        title: title[0],
        globalId: globalId[0],
        viewItemURL: viewItemURL[0],
        galleryURL: galleryURL[0],
        primaryCategoryId: primaryCategory[0].categoryId[0],
        finalPrice: parseFloat(sellingStatus[0].currentPrice[0].__value__),
        location: location[0],
        country: country[0],
        shippingCost: parseFloat(shippingInfo[0].shippingServiceCost[0].__value__),
        listingType: listingInfo[0].listingType[0],
        bestOfferEnabled: Boolean(listingInfo[0].bestOfferEnabled[0]),
      };

      return createEbayItemDto;
    } catch (error) {
      this.logger.error(`Error converting raw ebay item for database use: ${error}, Raw ebay item: ${rawEbayItem}`);
    }
  }

  async createEbayItem(rawEbayItem: Item) {
    try {
      const mappedData = await this.dataMapper(rawEbayItem);

      return this.ebayItemRepository.createEbayItem(mappedData);
    } catch (error) {
      this.logger.error('createEbayItem: ', error);
    }
  }

  async getEbayItems(filterDto: GetEbayItemFilterDto): Promise<EbayItem[]> {
    return await this.ebayItemRepository.getEbayItems(filterDto);
  }
}
