import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ComicModule } from './comic/comic.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { VendorModule } from './vendor/vendor.module';
import { GraderModule } from './grader/grader.module';
import { SeriesModule } from './series/series.module';
import { IssueModule } from './issue/issue.module';
import { ConditionModule } from './condition/condition.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.API_DB_HOST,
      port: parseInt(process.env.API_DB_PORT),
      username: process.env.API_DB_USERNAME,
      password: process.env.API_DB_PASSWORD,
      database: process.env.API_DB_DATABASE_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    InventoryModule,
    AuthModule,
    ComicModule,
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
