import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApprovalRepository } from './approval.repository';
import { Approval } from './approval.entity';
import { User } from '../auth/user.entity';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { GetEbayItemResponseDto } from '../ebay-api/dto/get-ebay-item-response.dto';
import { EbayApiService } from '../ebay-api/ebay-api.service';
import { InventoryService } from '../inventory/inventory.service';
import { SeriesService } from '../series/series.service';
import { IssueService } from '../issue/issue.service';
import { GetEbayItemFilterDto } from '../ebay-api/dto/get-ebay-item-filter.dto';

@Injectable()
export class ApprovalService {
  private logger = new Logger('ApprovalService');

  constructor(
    @InjectRepository(ApprovalRepository) private approvalRepository: ApprovalRepository,
    private ebayApiService: EbayApiService,
    private inventoryService: InventoryService,
    private seriesService: SeriesService,
    private issueService: IssueService,
  ) {}

  // async getApproval(): Promise<Approval[]> {
  //   const u = User;
  //   return await this.approvalRepository.
  // }

  async createApproval(createApprovalDto: CreateApprovalDto, user: User): Promise<Approval> {
    return this.approvalRepository.createApproval(createApprovalDto, user);
  }

  async getPending(inventoryId: number, user: User): Promise<GetEbayItemResponseDto[]> {
    try {
      // Get Issue number
      const inventory = await this.inventoryService.getInventoryById(inventoryId, user);

      // Get Series name
      const series = await this.seriesService.getSeriesById(inventory.issue.series.id);

      // Get the ids of approvals to filter out
      const currentApprovals = await this.approvalRepository.find({
        where: { userId: user.id, inventoryId: inventoryId },
      });

      let approvalIds = [];
      if (currentApprovals.length > 0) {
        approvalIds = currentApprovals.map(item => item.ebayItemId);
      }

      const getEbayItemFilterDto: GetEbayItemFilterDto = {
        series: series.name,
        issue: inventory.issue.issueNumber,
        excludingIds: approvalIds,
      };

      const results = await this.ebayApiService.get(getEbayItemFilterDto, user);
      return results;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
