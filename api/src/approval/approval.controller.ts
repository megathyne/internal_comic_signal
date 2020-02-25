import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Logger, Get, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Approval } from './approval.entity';
import { ApprovalRepository } from './approval.repository';

@ApiUseTags('approval')
@ApiBearerAuth()
@Controller('approval')
@UseGuards(AuthGuard('jwt'))
export class ApprovalController {
  private logger = new Logger('ApprovalController');

  constructor(private readonly approvalService: ApprovalService) {}

  @Get()
  get(@GetUser() user: User): Promise<Approval[]> {
    this.logger.verbose(`User "${user.username}" retrieving all ebay data matching inventory`);
    return this.approvalService.getApproval();
  }

  @Post()
  post(@GetUser() user: User): Promise<void> {
    this.logger.verbose(`User "${user.username}" posting new approval`); 
    return this.approvalService.createApproval();
  }
}
