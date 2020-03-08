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

  // async getCompleted(inventoryId: number, user: User): Promise<GetEbayItemResponseDto[]> {
  //   // Get the ids of approvals to return
  //   const completedApprovals = await this.approvalRepository.find({
  //     select: ['ebayItemId'],
  //     where: { userId: user.id, inventory: inventoryId },
  //   });

  //   let ebayIds = [];
  //   if (completedApprovals.length > 0) {
  //     ebayIds = completedApprovals.map(item => item.ebayItemId);
  //   }
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
        select: ['ebayItemId'],
        where: { userId: user.id, inventory: inventoryId },
      });

      let ebayIds = [];
      if (currentApprovals.length > 0) {
        ebayIds = currentApprovals.map(item => item.ebayItemId);
      }

      const getEbayItemFilterDto: GetEbayItemFilterDto = {
        series: series.name,
        issue: inventory.issue.issueNumber,
        excludingIds: ebayIds,
      };

      const results = await this.ebayApiService.get(getEbayItemFilterDto, user);
      return results;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
