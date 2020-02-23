import { Controller, HttpModule, Get, UseInterceptors, Query, Logger } from '@nestjs/common';
import { FindingService } from './finding.service';
import { findCompletedItemsResponse } from './dto/findCompletedItemsResponse.dto';

@Controller('finding')
export class FindingController {
  private logger = new Logger(`FindingController`);

  constructor(private readonly findingService: FindingService) {}

  @Get()
  get() {
    this.logger.verbose(`Initiating eBay API calls for completed items`);
    return this.findingService.getCompletedItems();
  }
}
