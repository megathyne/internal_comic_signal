import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueRepository } from './issue.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IssueRepository])],
  providers: [IssueService],
  controllers: [IssueController],
})
export class IssueModule {}
