import { Module, Logger } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EbayItem } from "src/ebay-item/ebay-item.entity";
import { EbayDataSeederService } from "./ebay-data-seeder.service";

@Module({
    imports: [TypeOrmModule.forFeature([EbayItem]), Logger],
    providers: [EbayDataSeederService],
    exports: [EbayDataSeederService]
  })
  export class EbayDataSeederModule {}