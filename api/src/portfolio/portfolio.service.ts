import { Injectable, Logger } from '@nestjs/common';
import { InventoryService } from 'src/inventory/inventory.service';
import { User } from 'src/auth/user.entity';
import { GcdApiService } from 'src/gcd-api/gcd-api.service';
import { ApprovalService } from 'src/approval/approval.service';
import { EbayApiService } from 'src/ebay-api/ebay-api.service';
import { Inventory } from 'src/inventory/inventory.entity';

@Injectable()
export class PortfolioService {
  private logger = new Logger('PortfolioService');

  constructor(
    private inventoryService: InventoryService,
    private gcdApiService: GcdApiService,
    private approvalService: ApprovalService,
  ) {}

  async getPortfolioItem(inventory: Inventory, user: User) {
    const comic = await this.gcdApiService.getById(inventory.comicId, user);
    const approvals = await this.approvalService.getCompletedByApproved(inventory.id, user);
    const pendingApprovalCount = await this.approvalService.getPendingCount(inventory.id, user);

    return {
      comic: {
        issueId: inventory.comicId,
        seriesName: comic.series.name,
        volume: comic.series.year_began,
        number: comic.number,
      },
      inventory: {
        id: inventory.id,
        date: inventory.acquired,
        amount: inventory.cost,
        validTransactions: approvals.map(({ itemId, finalPrice, endTime }) => ({
          ebayItemId: itemId,
          amount: parseFloat(finalPrice),
          date: new Date(endTime).toISOString().split('T')[0],
        })),
        value: approvals.reduce((p, c) => (p += parseFloat(c.finalPrice)), 0) / approvals.length || 0,
        pendingApprovalCount,
      },
    };
  }

  async get(user: User) {
    const inventory = await this.inventoryService.get(user);

    const portfolio = [];
    for (let i = 0; i < inventory.length; i++) {
      const portfolioItem = await this.getPortfolioItem(inventory[i], user);
      portfolio.push(portfolioItem);
    }

    const topThreeValue = portfolio
      .sort((a, b) => b.inventory.value - a.inventory.value)
      .slice(0, 3)
      .map(({ comic: { issueId, seriesName, volume, number }, inventory: { id, value } }) => ({
        issueId,
        title: seriesName + ' (' + volume + ') ' + '#' + number,
        data: value.toFixed(2),
      }));

    const topThreePending = portfolio
      .sort((a, b) => b.inventory.pendingApprovalCount - a.inventory.pendingApprovalCount)
      .slice(0, 3)
      .map(({ comic: { issueId, seriesName, volume, number }, inventory: { id, pendingApprovalCount } }) => ({
        issueId,
        title: seriesName + ' (' + volume + ') ' + '#' + number,
        data: pendingApprovalCount,
      }));

    const portfolioChart = {
      cost: portfolio
        .map(({ inventory }) => ({
          id: inventory.id,
          date: inventory.date,
          amount: parseFloat(inventory.amount),
        }))
        .sort((a, b) => b.date - a.date),
    };

    return {
      portfolioChart,
      portfolio,
      topThreeValue,
      topThreePending,
    };
  }
}
