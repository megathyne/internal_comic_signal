import { Module, Logger, HttpModule } from "@nestjs/common";
import { SeederService } from "./seeder.service";
import { EbayItemModule } from "../ebay-item/ebay-item.module";
import { FindingModule } from "../finding/finding.module";
import { EbayItemService } from "../ebay-item/ebay-item.service";
import { FindingService } from "../finding/finding.service";


@Module({
    imports: [EbayItemModule,FindingModule, HttpModule],
    providers: [Logger, SeederService, EbayItemService, FindingService],
})
export class SeederModule {}
