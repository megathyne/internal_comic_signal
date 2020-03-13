import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from 'src/ormconfig';
import { SeederService } from './seeder.service';
import { SeriesSeederModule } from './series/series-seeder.module';
import { IssueSeederModule } from './issue/issue-seeder.module';
import { AuthSeederModule } from './auth/auth-seeder.module';
import { ConditionSeederModule } from './condition/condition-seeder.module';
import { GraderSeederModule } from './grader/grader-seeder.module';
import { PageSeederModule } from './page/page-seeder.module';
import { VendorSeederModule } from './vendor/vendor-seeder.module';
import { InventorySeederModule } from './inventory/inventory-seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    SeriesSeederModule,
    IssueSeederModule,
    AuthSeederModule,
    ConditionSeederModule,
    GraderSeederModule,
    PageSeederModule,
    VendorSeederModule,
    InventorySeederModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
