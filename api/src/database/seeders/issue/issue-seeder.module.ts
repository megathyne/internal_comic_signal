import { Module, Logger } from '@nestjs/common';
import { IssueModule } from 'src/issue/issue.module';
import { IssueSeederService } from './issue-seeder.service';
import { SeriesModule } from 'src/series/series.module';

@Module({
  imports: [IssueModule, SeriesModule, Logger],
  providers: [IssueSeederService],
  exports: [IssueSeederService],
})
export class IssueSeederModule {}
