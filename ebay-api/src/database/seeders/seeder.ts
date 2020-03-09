import { Injectable, Logger } from "@nestjs/common";
import { EbayDataSeederService } from "./ebay-data/ebay-data-seeder.service";

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly ebayDataSeederService: EbayDataSeederService,
  ) {}
  async seed() {
    await this.ebayDatas()
      .then(completed => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }
  async ebayDatas() {
    return await Promise.all(this.ebayDataSeederService.create())
      .then(createdEbayData => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of languages created : ' +
            // Remove all null values and return only created languages.
            createdEbayData.filter(
              nullValueOrCreatedLanguage => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}