import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { VendorModule } from './vendor/vendor.module';
import { GraderModule } from './grader/grader.module';
import { SeriesModule } from './series/series.module';
import { IssueModule } from './issue/issue.module';
import { ConditionModule } from './condition/condition.module';
import { PageModule } from './page/page.module';
import { EbayApiModule } from './ebay-api/ebay-api.module';
import { ApprovalModule } from './approval/approval.module';
import * as ormconfig from './ormconfig';
import { ComicModule } from './comic/comic.module';
import { GcdApiModule } from './gcd-api/gcd-api.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    AnalyticsModule,
    ApprovalModule,
    ComicModule,
    ConditionModule,
    GcdApiModule,
    GraderModule,
    EbayApiModule,
    InventoryModule,
    IssueModule,
    PageModule,
    PortfolioModule,
    SeriesModule,
    VendorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
