import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig';
import { EbayDataSeederModule } from './ebay-data/ebay-data-seeder.module';
import { Seeder } from './seeder';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), EbayDataSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
