import { Module, Logger } from '@nestjs/common';
import { SeriesModule } from 'src/series/series.module';
import { SeriesSeederService } from './series-seeder.service';

@Module({
  imports: [SeriesModule, Logger],
  providers: [SeriesSeederService],
  exports: [SeriesSeederService],
})
export class SeriesSeederModule {}
