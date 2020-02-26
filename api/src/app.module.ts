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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    InventoryModule,
    AuthModule,
    EbayApiModule,
    AnalyticsModule,
    VendorModule,
    ConditionModule,
    GraderModule,
    SeriesModule,
    PageModule,
    IssueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
