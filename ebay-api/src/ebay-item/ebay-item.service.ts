import { Injectable, Logger } from '@nestjs/common';
import { EbayItemRepository } from './ebay-item.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EbayItem } from './ebay-item.entity';
import { Item } from 'src/finding/dto/FindCompletedItemsResponse.dto';
import { CreateEbayItemDto } from './dto/create-ebay-item.dto';

//need a function that must accept ebay-item.entity
//calls Repository to save to (check if item exists first)
//comment where code to import ebay images to S3 (S3 gives an id)

@Injectable()
export class EbayItemService {
  private logger = new Logger('EbayItemService');
  constructor(@InjectRepository(EbayItemRepository) private ebayItemRepository: EbayItemRepository) {}

  // data = {
  //   itemId: ['233484176985'],
  //   title: ['Spawn 297/298/299/300/301 Set NM McFarlane Image J. Scott Campbell B&W Variant'],
  //   globalId: ['EBAY-US'],
  //   primaryCategory: [{ categoryId: ['17079'], categoryName: ['Spawn'] }],
  //   galleryURL: ['https://thumbs3.ebaystatic.com/m/mNWBc4i3oLF5eCNnJA1mNBQ/140.jpg'],
  //   viewItemURL: [
  //     'https://www.ebay.com/itm/Spawn-297-298-299-300-301-Set-NM-McFarlane-Image-J-Scott-Campbell-B-W-Variant-/233484176982',
  //   ],
  //   paymentMethod: ['PayPal'],
  //   autoPay: ['true'],
  //   postalCode: ['481**'],
  //   location: ['Ann Arbor,MI,USA'],
  //   country: ['US'],
  //   shippingInfo: [
  //     {
  //       shippingServiceCost: [{ '@currencyId': 'USD', __value__: '0.0' }],
  //       shippingType: ['Free'],
  //       shipToLocations: ['Worldwide'],
  //       expeditedShipping: ['false'],
  //       oneDayShippingAvailable: ['false'],
  //       handlingTime: ['3'],
  //     },
  //   ],
  //   sellingStatus: [
  //     {
  //       currentPrice: [{ '@currencyId': 'USD', __value__: '17.99' }],
  //       convertedCurrentPrice: [{ '@currencyId': 'USD', __value__: '17.99' }],
  //       sellingState: ['EndedWithSales'],
  //     },
  //   ],
  //   listingInfo: [
  //     {
  //       bestOfferEnabled: ['true'],
  //       buyItNowAvailable: ['false'],
  //       startTime: ['2020-02-03T06:27:37.000Z'],
  //       endTime: ['2020-02-23T02:13:22.000Z'],
  //       listingType: ['FixedPrice'],
  //       gift: ['false'],
  //     },
  //   ],
  //   returnsAccepted: ['false'],
  //   isMultiVariationListing: ['false'],
  //   topRatedListing: ['false'],
  // };

  // mappedData = {
  //   itemId: this.data.itemId[0],
  //   title: this.data.title[0],
  //   globalId: this.data.globalId[0],
  //   viewItemURL: this.data.viewItemURL[0],
  //   galleryURL: this.data.galleryURL[0],
  //   primaryCategoryId: this.data.primaryCategory[0].categoryId,
  //   finalPrice: this.data.sellingStatus[0].currentPrice[0].__value__,
  //   location: this.data.location,
  //   country: this.data.country,
  //   shippingCost: this.data.shippingInfo[0].shippingServiceCost[0].__value__,
  //   listingType: this.data.listingInfo[0].listingType[0],
  //   bestOfferEnabled: this.data.listingInfo[0].bestOfferEnabled[0],
  // };

  async dataMapper(data: Item): Promise<CreateEbayItemDto> {
    try {
      const createEbayItemDto: CreateEbayItemDto = {
        itemId: null,
        title: null,
        globalId: null,
        viewItemURL: null,
        galleryURL: null,
        primaryCategoryId: null,
        finalPrice: null,
        location: null,
        country: null,
        shippingCost: null,
        listingType: null,
        bestOfferEnabled: null,
      };

      createEbayItemDto.itemId = data.itemId[0];

      createEbayItemDto.title = data.title[0];

      createEbayItemDto.globalId = data.globalId[0];

      createEbayItemDto.viewItemURL = data.viewItemURL[0];

      createEbayItemDto.galleryURL = data.galleryURL[0];

      createEbayItemDto.primaryCategoryId = data.primaryCategory[0].categoryId[0];

      createEbayItemDto.finalPrice = data.sellingStatus[0].currentPrice[0].__value__[0];

      createEbayItemDto.location = data.location[0];

      createEbayItemDto.country = data.country[0];

      if (data.shippingInfo[0].shippingServiceCost)
        createEbayItemDto.shippingCost = data.shippingInfo[0].shippingServiceCost[0].__value__[0];
      else createEbayItemDto.shippingCost = '0';

      createEbayItemDto.listingType = data.listingInfo[0].listingType[0];

      createEbayItemDto.bestOfferEnabled = data.listingInfo[0].bestOfferEnabled[0];

      return createEbayItemDto;
    } catch (error) {
      this.logger.error('dataMapper:', error);
    }
  }

  async createEbayItem(rawEbayItem: Item) {
    try {
      this.logger.log('In createEbayItem Service!');

      const mappedData = await this.dataMapper(rawEbayItem);

      return this.ebayItemRepository.createEbayItem(mappedData);
    } catch (error) {
      this.logger.error('createEbayItem: ', error);
    }
  }
}
