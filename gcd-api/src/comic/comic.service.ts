//FUNCTIONS

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueRepository } from './issue.repository';
import { ComicDto } from './dto/comic.dto';
import { SeriesRepository } from './series.repository';
import { Series } from './series.entity';

@Injectable()
export class ComicService {
  private logger = new Logger('ComicService');

  constructor(
    @InjectRepository(IssueRepository)
    private issueRepository: IssueRepository,
    @InjectRepository(SeriesRepository)
    private seriesRepository: SeriesRepository,
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

  async getComicsBySeries(search: string): Promise<Series[]> {
    try {
      const found = await this.seriesRepository.getSeries(search);
      return found;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
