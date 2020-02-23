import { Module, HttpModule } from '@nestjs/common';
import { FindingController } from './finding.controller';
import { FindingService } from './finding.service';
import { EbayItemModule } from '../ebay-item/ebay-item.module';

@Module({
  imports: [HttpModule, EbayItemModule],
  controllers: [FindingController],
  providers: [FindingService],
})
export class FindingModule {}
