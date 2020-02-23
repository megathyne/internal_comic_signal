import { Module, HttpModule } from '@nestjs/common';
import { FindingController } from './finding.controller';
import { FindingService } from './finding.service';

@Module({
  imports: [HttpModule],
  controllers: [FindingController],
  providers: [FindingService]
})
export class FindingModule {}
