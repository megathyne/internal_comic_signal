import { Module, Logger } from '@nestjs/common';
import { EbayItemModule } from 'src/ebay-item/ebay-item.module';
import { EbayDataSeederService } from './ebay-data-seeder.service';

@Module({
  imports: [EbayItemModule, Logger],
  providers: [EbayDataSeederService],
  exports: [EbayDataSeederService],
})
export class EbayDataSeederModule {}
