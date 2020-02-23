import { EntityRepository, Repository } from 'typeorm';
import { EbayItem } from './ebay-item.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(EbayItem)
export class EbayItemRepository extends Repository<EbayItem> {
  private logger = new Logger('EbayItem Repository');

  async createEbayItem(data): Promise<string> {
    const eBI = this.create();
    eBI.itemId = data.itemId;
    eBI.title = data.title;
    eBI.globalId = data.globalId;
    eBI.viewItemURL = data.viewItemURL;
    eBI.galleryURL = data.galleryURL;
    eBI.primarycategoryId = data.primaryCategoryId;
    eBI.finalPrice = data.finalPrice;
    eBI.location = data.location;
    eBI.country = data.country;
    eBI.shippingCost = data.shippingCost;
    eBI.listingType = data.listingType;
    eBI.bestOfferEnabled = data.bestOfferEnabled;
    

    try {
      await eBI.save();
    } catch (error) {
      if (error.code === '23505') {
        //duplicate ebay item entry
        this.logger.error(`Failed to add item, already exists!`);
        return 'Item Already Exists Goober!';
      }
      this.logger.error(`Unable to add eBay item.`);
    }
  }
}
