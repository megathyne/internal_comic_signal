import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { InventoryModule } from 'src/inventory/inventory.module';
import { ApprovalModule } from 'src/approval/approval.module';

@Module({
  imports: [InventoryModule, ApprovalModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
