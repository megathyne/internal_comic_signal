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
import { GcdApiService } from 'src/gcd-api/gcd-api.service';

@Injectable()
export class ApprovalService {
  private logger = new Logger('ApprovalService');

  constructor(
    @InjectRepository(ApprovalRepository) private approvalRepository: ApprovalRepository,
    private ebayApiService: EbayApiService,
    private inventoryService: InventoryService,
    private seriesService: SeriesService,
    private issueService: IssueService,
    private gcdApiService: GcdApiService,
  ) {}

  async getCompleted(inventoryId: number, user: User): Promise<GetEbayItemResponseDto[]> {
    try {
      // Get the ids of approvals to return
      const completedApprovals = await this.approvalRepository.find({
        select: ['ebayItemId'],
        where: { userId: user.id, inventory: inventoryId },
      });

      let ebayIds = [];
      if (completedApprovals.length > 0) {
        ebayIds = completedApprovals.map(item => item.ebayItemId);
        const results = await this.ebayApiService.getByIds(ebayIds, user);
        return results;
      } else {
        return [];
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getCompletedByApproved(inventoryId: number, user: User): Promise<GetEbayItemResponseDto[]> {
    try {
      // Get the ids of approvals to return
      const completedApprovals = await this.approvalRepository.find({
        select: ['ebayItemId'],
        where: { userId: user.id, inventory: inventoryId, isApproved: true },
      });

      let ebayIds = [];
      if (completedApprovals.length > 0) {
        ebayIds = completedApprovals.map(item => item.ebayItemId);
        const results = await this.ebayApiService.getByIds(ebayIds, user);
        return results;
      } else {
        return [];
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async createApproval(createApprovalDto: CreateApprovalDto, user: User): Promise<any> {
    return this.approvalRepository.createApproval(createApprovalDto, user);
  }

  async getPending(inventoryId: number, user: User): Promise<any> {
    try {
      // Get Issue number
      const inventory = await this.inventoryService.getInventoryById(inventoryId, user);

      const comic = await this.gcdApiService.getById(inventory.comicId, user);
      const cover = await this.gcdApiService.getCoverById(inventory.comicId, user);

      // Get Series name
      //const series = await this.seriesService.getSeriesById(inventory.issue.series.id);

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
        series: comic.series.name,
        issue: comic.number,
        excludingIds: ebayIds,
      };

      const pendingApprovals = await this.ebayApiService.get(getEbayItemFilterDto, user);
      const retVal = {
        inventory,
        comic,
        cover,
        pendingApprovals,
      };

      return retVal;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
