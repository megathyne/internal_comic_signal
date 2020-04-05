import { Injectable, Logger } from '@nestjs/common';
import { SeriesSeederService } from './series/series-seeder.service';
import { IssueSeederService } from './issue/issue-seeder.service';
import { AuthSeederService } from './auth/auth-seeder.service';
import { ConditionSeederService } from './condition/condition-seeder.service';
import { GraderSeederService } from './grader/grader-seeder.service';
import { PageSeederService } from './page/page-seeder.service';
import { VendorSeederService } from './vendor/vendor-seeder.service';
import { InventorySeederService } from './inventory/inventory-seeder.service';

@Injectable()
export class SeederService {
  private logger = new Logger('SeederService');
  constructor(
    private readonly seriesSeederService: SeriesSeederService,
    private readonly issueSeederService: IssueSeederService,
    private readonly authSeederService: AuthSeederService,
    private readonly conditionSeederService: ConditionSeederService,
    private readonly graderSeederService: GraderSeederService,
    private readonly pageSeederService: PageSeederService,
    private readonly vendorSeederService: VendorSeederService,
    private readonly inventorySeederService: InventorySeederService,
  ) {}
  async seed() {
    try {
      // await this.seriesSeederService.create();
      // await this.issueSeederService.create();
      await this.authSeederService.create();
      await this.conditionSeederService.create();
      await this.graderSeederService.create();
      await this.pageSeederService.create();
      await this.vendorSeederService.create();
      // await this.inventorySeederService.create();
    } catch (error) {
      this.logger.log('Error in SeederService: ', error);
    }
  }
}
