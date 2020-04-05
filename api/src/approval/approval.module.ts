import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalRepository } from './approval.repository';
import { AuthModule } from '../auth/auth.module';
import { ApprovalController } from './approval.controller';
import { ApprovalService } from './approval.service';
import { EbayApiModule } from '../ebay-api/ebay-api.module';
import { InventoryModule } from '../inventory/inventory.module';
import { SeriesModule } from '../series/series.module';
import { IssueModule } from '../issue/issue.module';
import { GcdApiModule } from 'src/gcd-api/gcd-api.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApprovalRepository]),
    AuthModule,
    EbayApiModule,
    InventoryModule,
    SeriesModule,
    IssueModule,
    GcdApiModule,
  ],
  controllers: [ApprovalController],
  providers: [ApprovalService],
  exports: [ApprovalService],
})
export class ApprovalModule {}
