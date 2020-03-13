import { Module } from '@nestjs/common';
import { InventoryModule } from 'src/inventory/inventory.module';
import { AuthModule } from 'src/auth/auth.module';
import { IssueModule } from 'src/issue/issue.module';
import { ConditionModule } from 'src/condition/condition.module';
import { GraderModule } from 'src/grader/grader.module';
import { PageModule } from 'src/page/page.module';
import { VendorModule } from 'src/vendor/vendor.module';
import { InventorySeederService } from './inventory-seeder.service';

@Module({
  imports: [InventoryModule, AuthModule, IssueModule, ConditionModule, GraderModule, PageModule, VendorModule],
  providers: [InventorySeederService],
  exports: [InventorySeederService],
})
export class InventorySeederModule {}
