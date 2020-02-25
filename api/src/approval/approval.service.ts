import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApprovalRepository } from './approval.repository';
import { Approval } from './approval.entity';
import { User } from 'src/auth/user.entity';
import { CreateApprovalDto } from './dto/create-approval.dto';

@Injectable()
export class ApprovalService {
  private logger = new Logger('ApprovalService');

  constructor(@InjectRepository(ApprovalRepository) private approvalRepository: ApprovalRepository) {}

  async getApproval(): Promise<Approval[]> {
    const u = User;
    return await this.approvalRepository.
  }

  async createApproval(createApprovalDto: CreateApprovalDto, user: User): Promise<Approval> {
    return this.approvalRepository.createApproval(createApprovalDto, user);
  }
}
