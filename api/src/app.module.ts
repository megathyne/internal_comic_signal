import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ComicModule } from './comic/comic.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { VendorModule } from './vendor/vendor.module';
import { GradeModule } from './grade/grade.module';
import { SeriesModule } from './series/series.module';
import { IssueModule } from './issue/issue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'internal_comic_signal',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    InventoryModule,
    AuthModule,
    ComicModule,
    AnalyticsModule,
    VendorModule,
    GradeModule,
    SeriesModule,
    IssueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
