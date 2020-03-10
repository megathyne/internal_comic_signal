import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EbayItemRepository } from 'src/ebay-item/ebay-item.repository';
import { ebayData } from './data';

@Injectable()
export class EbayDataSeederService {
  private logger = new Logger('EbayDataSeederService');
  constructor(
    @InjectRepository(EbayItemRepository)
    private ebayItemRepository: EbayItemRepository,
  ) {}

  async create(): Promise<void> {
    try {
      for (let i = 0; i < ebayData.length; i++) {
        const existing = await this.ebayItemRepository.findOne({ itemId: ebayData[i].itemId });
        if (!existing) {
          await this.ebayItemRepository.createEbayItem(ebayData[i]);
          this.logger.log(`Created new Ebay-Item`);
        } else {
          this.logger.log(`Ebay-Item already exists`);
        }
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }
}
