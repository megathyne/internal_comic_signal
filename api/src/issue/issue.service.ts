import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './issue.entity';
import { IssueRepository } from './issue.repository';
import { GetIssueFilterDto } from './dto/get-issue-filter.dto';

@Injectable()
export class IssueService {
  private logger = new Logger('IssueService');

  constructor(@InjectRepository(IssueRepository) private issueRepository: IssueRepository){}

  async getIssue(filterDto:GetIssueFilterDto): Promise<Issue[]>{
    return await this.issueRepository.getIssue(filterDto);
  }

}
