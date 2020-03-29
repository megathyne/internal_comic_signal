//FUNCTIONS

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueRepository } from './issue.repository';
import { ComicDto } from './dto/comic.dto';
import { SeriesRepository } from './series.repository';
import { Series } from './series.entity';
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
      let cover = await this.coverService.getCoverSmall(found[0].issueId);
      return { cover };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
