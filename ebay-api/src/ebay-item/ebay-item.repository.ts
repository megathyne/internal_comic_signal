import { EntityRepository, Repository } from 'typeorm';
import { EbayItem } from './ebay-item.entity';
import { Logger } from '@nestjs/common';
import { CreateEbayItemDto } from './dto/create-ebay-item.dto';

@EntityRepository(EbayItem)
export class EbayItemRepository extends Repository<EbayItem> {
  private logger = new Logger('EbayItem Repository');

  async createEbayItem(createEbayItemDto: CreateEbayItemDto): Promise<string> {
    const ebayItem = this.create();
    ebayItem.itemId = createEbayItemDto.itemId;
    ebayItem.title = createEbayItemDto.title;
    ebayItem.globalId = createEbayItemDto.globalId;
    ebayItem.viewItemURL = createEbayItemDto.viewItemURL;
    ebayItem.galleryURL = createEbayItemDto.galleryURL;
    ebayItem.primaryCategoryId = createEbayItemDto.primaryCategoryId;
    ebayItem.finalPrice = createEbayItemDto.finalPrice;
    ebayItem.location = createEbayItemDto.location;
    ebayItem.country = createEbayItemDto.country;
    ebayItem.shippingCost = createEbayItemDto.shippingCost;
    ebayItem.listingType = createEbayItemDto.listingType;
    ebayItem.bestOfferEnabled = createEbayItemDto.bestOfferEnabled;

    try {
      await ebayItem.save();
    } catch (error) {
      if (error.code === '23505') {
        //duplicate ebay item entry
        this.logger.error(`Failed to add item, already exists!`);
        return 'Item Already Exists Goober!';
      }
      this.logger.error(`Unable to add eBay item.`, error);
    }
  }
}
