import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig';
import { EbayDataSeederModule } from './ebay-data/ebay-data-seeder.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), EbayDataSeederModule],
  providers: [SeederService],
})
export class SeederModule {}
