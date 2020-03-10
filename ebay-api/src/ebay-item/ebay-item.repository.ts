import { EntityRepository, Repository } from 'typeorm';
import { EbayItem } from './ebay-item.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateEbayItemDto } from './dto/create-ebay-item.dto';
import { GetEbayItemFilterDto } from './dto/get-ebay-item-filter.dto';

@EntityRepository(EbayItem)
export class EbayItemRepository extends Repository<EbayItem> {
  private logger = new Logger('EbayItem Repository');

  async createEbayItem(createEbayItemDto: CreateEbayItemDto): Promise<void> {
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
    ebayItem.totalCost = ebayItem.totalCost;

    try {
      await ebayItem.save();
    } catch (error) {
      if (error.code === '23505') {
        //duplicate ebay item entry
        this.logger.error(`Failed to add item, already exists!`);
      }
      this.logger.error(`Unable to add eBay item.`, error);
    }
  }

  async getEbayItems(filterDto: GetEbayItemFilterDto): Promise<EbayItem[]> {
    const { series, issue, excludingIds } = filterDto;
    const query = this.createQueryBuilder('ebay_item');

    if (series && issue) {
      query.where('(LOWER(ebay_item.title) LIKE LOWER(:series))', { series: `%${series}%` });
      query.andWhere('(LOWER(ebay_item.title) LIKE LOWER(:issue))', { issue: `%${issue}%` });
    }

    if (excludingIds) {
      query.andWhere('ebay_item.id NOT IN (:...excludingIds)', { excludingIds: excludingIds });
    }

    try {
      const ebayItems = await query.getMany();
      return ebayItems;
    } catch (error) {
      this.logger.error(`Failed to get ebay items. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
