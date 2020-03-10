import { Injectable, Logger } from '@nestjs/common';
import { EbayDataSeederService } from './ebay-data/ebay-data-seeder.service';

@Injectable()
export class SeederService {
  private logger = new Logger('SeederService');
  constructor(private readonly ebayDataSeederService: EbayDataSeederService) {}
  async seed() {
    try {
      await this.ebayDataSeederService.create();
    } catch (error) {
      this.logger.log('Error in SeederService: ', error);
    }
  }
}
