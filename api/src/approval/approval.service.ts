import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApprovalRepository } from './approval.repository';

@Injectable()
export class ApprovalService {
  private logger = new Logger('ApprovalService');

  constructor(@InjectRepository(ApprovalRepository) private approvalRepository: ApprovalRepository) {}

  async getApproval(): Promise<Approval[]> {}

  async createApproval(): Promise<void> {
      
  }
}
