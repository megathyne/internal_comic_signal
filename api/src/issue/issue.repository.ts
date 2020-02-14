import { EntityRepository, Repository } from 'typeorm';
import { GetIssueFilterDto } from './dto/get-issue-filter.dto';
import { Issue } from './issue.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { GetSeriesByIssueIdDto } from './dto/get-issue-by-series-id.dto';

@EntityRepository(Issue)
export class IssueRepository extends Repository<Issue> {
  private logger = new Logger('IssueRepository');

  async getIssue(filterDto: GetIssueFilterDto): Promise<Issue[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('issue');
    query.innerJoinAndSelect('issue.series', 'series');

    if (search) {
      query.where('(CAST(issue.issueNumber AS varchar) LIKE :search)', { search: `%${search}%` });
    }

    try {
      const issue = await query.getMany();
      this.logger.verbose(issue);
      return issue;
    } catch (error) {
      this.logger.error(`Failed to get issue. Filters: ${(JSON.stringify(filterDto), error.stack)}`);
      throw new InternalServerErrorException();
    }
  }

  async getIssueBySeries(getSeriesByIssueIdDto: GetSeriesByIssueIdDto): Promise<Issue[]> {
    const { seriesId } = getSeriesByIssueIdDto;
    try {
      const issues = await this.find({ series: { id: seriesId } });
      this.logger.verbose(issues);
      return issues;
    } catch (error) {
      this.logger.error(`Failed to get issue by series id, SeriesId: ${seriesId} error.stack)}`);
      throw new InternalServerErrorException();
    }
  }
}
