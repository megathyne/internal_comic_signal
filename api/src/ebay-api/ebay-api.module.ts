import { Module, HttpModule } from '@nestjs/common';
import { EbayApiService } from './ebay-api.service';

@Module({
  imports: [HttpModule],
  providers: [EbayApiService],
  exports: [EbayApiService],
})
export class EbayApiModule {}
