import { Module, HttpModule } from '@nestjs/common';
import { EbayApiService } from './ebay-api.service';

@Module({
  imports: [HttpModule],
  providers: [EbayApiService],
  exports: [],
})
export class EbayApiModule {}
