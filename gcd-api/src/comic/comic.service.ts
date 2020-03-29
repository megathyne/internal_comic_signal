//FUNCTIONS

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueRepository } from './issue.repository';
import { ComicDto } from './dto/comic.dto';
import { SeriesRepository } from './series.repository';
import { CoverService } from 'src/cover/cover.service';

@Injectable()
export class ComicService {
  private logger = new Logger('ComicService');

  constructor(
    @InjectRepository(IssueRepository)
    private issueRepository: IssueRepository,
    @InjectRepository(SeriesRepository)
    private seriesRepository: SeriesRepository,
    private coverService: CoverService,
  ) {}

  async getComicByIssueId(id: number): Promise<ComicDto> {
    try {
      const found = await this.issueRepository.getComicByIssueId(id);

      if (!found) {
        this.logger.error(`Issue with ID "${id}" not found`);
        throw new NotFoundException(`Issue with ID "${id}" not found`);
      }
      return found;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getComicsBySeries(series: string, issue: number): Promise<any> {
    try {
      const found = await this.seriesRepository.getSeries(series, issue);
      const foundCovers = await Promise.all(
        found.map(item => this.coverService.coverImageSmall(item.issueId)),
      );

      const result: ComicDto[] = found.map(x => ({
        seriesId: x.seriesId,
        issueId: x.issueId,
        seriesName: x.seriesName,
        issueNumber: x.issueNumber,
        yearBegan: x.yearBegan,
        coverSmall: foundCovers.find(y => x.issueId == y.issueNumber),
      }));

      return result;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
