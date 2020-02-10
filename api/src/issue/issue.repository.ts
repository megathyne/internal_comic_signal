import { EntityRepository, Repository } from 'typeorm';
import { GetIssueFilterDto } from './dto/get-issue-filter.dto';
import { Issue } from './issue.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

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
}
