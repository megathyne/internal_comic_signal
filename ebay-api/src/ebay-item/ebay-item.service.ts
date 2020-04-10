import { Injectable, Logger, HttpService } from '@nestjs/common';
import { EbayItemRepository } from './ebay-item.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../finding/dto/findCompletedItemsResponse.dto';
import { CreateEbayItemDto } from './dto/create-ebay-item.dto';
import { GetEbayItemFilterDto } from './dto/get-ebay-item-filter.dto';
import { EbayItem } from './ebay-item.entity';

@Injectable()
export class EbayItemService {
  private logger = new Logger('EbayItemService');
  constructor(
    @InjectRepository(EbayItemRepository) private ebayItemRepository: EbayItemRepository,
    private readonly httpsService: HttpService,
  ) { }

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

    if (!itemId) console.log('missing itemId ' + itemId);
    if (!title) console.log('missing title ' + title);
    if (!globalId) console.log('missing globalId ' + globalId);
    if (!viewItemURL) console.log('missing viewItemURL ' + viewItemURL);
    if (!galleryURL) console.log('missing galleryURL ' + galleryURL);
    if (!primaryCategory) console.log('missing primaryCategory ' + primaryCategory);
    if (!sellingStatus) console.log('missing sellingStatus ' + sellingStatus);
    if (!location) console.log('missing location ' + location);
    if (!country) console.log('missing country ' + country);
    if (!shippingInfo) console.log('missing shippingInfo ' + shippingInfo);
    if (!listingInfo) console.log('missing listingInfo ' + listingInfo);

    try {
      let finalPrice = 0; // International sellers sometimes sell on US ebay. Need to check converted price first
      if (sellingStatus[0].convertedCurrentPrice) {
        finalPrice = parseFloat(sellingStatus[0].convertedCurrentPrice[0].__value__);
      } else {
        finalPrice = parseFloat(sellingStatus[0].currentPrice[0].__value__);
      }

      let shippingCost = 0; // Sometimes international auctions dont have a calculated price
      if (shippingInfo[0].shippingServiceCost) {
        shippingCost = parseFloat(shippingInfo[0].shippingServiceCost[0].__value__);
      }

      const createEbayItemDto: CreateEbayItemDto = {
        itemId: itemId[0],
        title: title[0],
        globalId: globalId[0],
        viewItemURL: viewItemURL[0],
        galleryURL: !galleryURL ? '' : galleryURL[0],
        primaryCategoryId: primaryCategory[0].categoryId[0],
        finalPrice,
        location: location[0],
        country: country[0],
        shippingCost,
        listingType: listingInfo[0].listingType[0],
        endTime: new Date(listingInfo[0].endTime[0]),
        bestOfferEnabled: Boolean(listingInfo[0].bestOfferEnabled[0]),
        totalCost: finalPrice + shippingCost,
      };
      return createEbayItemDto; 
    } catch (error) {
      this.logger.error(
        `Error converting raw ebay item for database use: ${error}, Raw ebay item: ${JSON.stringify(rawEbayItem)}`,
      );
    }
  }

  async createEbayItem(rawEbayItem: Item): Promise<void> {
    try {
      const mappedData = await this.dataMapper(rawEbayItem);
      return await this.ebayItemRepository.createEbayItem(mappedData);
    } catch (error) {
      this.logger.error('createEbayItem: ', error);
    }
  }

  async getEbayItems(filterDto: GetEbayItemFilterDto): Promise<EbayItem[]> {
    this.logger.log(`getEbayItems: Getting ebay items. Filter: ${JSON.stringify(filterDto)}`);
    return await this.ebayItemRepository.getEbayItems(filterDto);
  }

  async getByIds(ebayItemIds: string[]): Promise<EbayItem[]> {
    return await this.ebayItemRepository.getByIds(ebayItemIds);
  }

  async getItemById(id: string): Promise<any> {
    const url = `https://open.api.ebay.com/shopping/`;
    const params = {
      callname: 'GetSingleItem',
      responseencoding: 'JSON',
      appId: process.env.EBAY_API_APPID,
      version: 1141,
      ItemID: id,
    };

    try {
      const response = await this.httpsService.get(url, { params }).toPromise();
      console.log(response.data.Item);
      return response.data.Item;
    } catch (error) {
      this.logger.error(`Error fetching ebay item from ebay. Params: ${params}`, error);
    }
  }
}
