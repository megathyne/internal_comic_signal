import { Controller, Get, Logger } from '@nestjs/common';
import { FindingService } from './finding.service';

@Controller('finding')
export class FindingController {
  private logger = new Logger(`FindingController`);

  constructor(private readonly findingService: FindingService) {}

  @Get('completed')
  get() {
    this.logger.verbose(`Initiating eBay API calls for completed items`);
    this.findingService.getCompletedItems();
    return 'processing starting'
  }
}
