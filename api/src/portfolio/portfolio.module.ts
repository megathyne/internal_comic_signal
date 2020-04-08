import { Module } from '@nestjs/common';
import { InventoryModule } from 'src/inventory/inventory.module';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { GcdApiModule } from 'src/gcd-api/gcd-api.module';
import { ApprovalModule } from 'src/approval/approval.module';
import { EbayApiModule } from 'src/ebay-api/ebay-api.module';
@Module({
    imports: [InventoryModule, GcdApiModule, ApprovalModule, EbayApiModule],
    controllers: [PortfolioController],
    providers: [PortfolioService],
    exports: [],
})
export class PortfolioModule { }