import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueRepository } from 'src/issue/issue.repository';
import { issueData } from './issue-data';
import { seriesData } from '../series/series-data';
import { SeriesRepository } from 'src/series/series.repository';

@Injectable()
export class IssueSeederService {
  private logger = new Logger(`IssueSeederService`);

  constructor(
    @InjectRepository(IssueRepository)
    private issueRepository: IssueRepository,

    @InjectRepository(SeriesRepository)
    private seriesRepository: SeriesRepository,
  ) {}

  async create(): Promise<void> {
    try {
      for (let i = 0; i < seriesData.length; i++) {
        const elementSeries = seriesData[i];

        const series = await this.seriesRepository.findOne({
          where: {
            name: elementSeries.name,
            volume: elementSeries.volume,
          },
        });

        for (let k = 0; k < issueData.length; k++) {
          const elementIssue = issueData[k];

          const exists = await this.issueRepository.findOne({
            where: {
              issueNumber: elementIssue.issueNumber,
              memo: elementIssue.memo,
              series,
            },
          });

          if (!exists) {
            const issue = this.issueRepository.create({ ...elementIssue, series });
            const results = await issue.save();
            this.logger.log(`Issue ${results.issueNumber} - ${results.memo} - Created`);
          } else {
            this.logger.log(`Issue ${elementIssue.issueNumber} - ${elementIssue.memo} - Exists`);
          }
        }
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }
}
