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

  // async getPortfolioItem(inventory: Inventory, user: User) {
  //   const comic = await this.gcdApiService.getById(inventory.comicId, user);
  //   const approvals = await this.approvalService.getCompletedByApproved(inventory.id, user);
  //   const pendingApprovalCount = await this.approvalService.getPendingCount(inventory.id, user);

  //   return {
  //     comic: {
  //       issueId: inventory.comicId,
  //       seriesName: comic.series.name,
  //       volume: comic.series.year_began,
  //       number: comic.number,
  //     },
  //     inventory: {
  //       id: inventory.id,
  //       date: inventory.acquired,
  //       amount: inventory.cost,
  //       condition: inventory.condition.numerical + ' ' + inventory.condition.name,
  //       validTransactions: approvals.map(({ itemId, finalPrice, endTime }) => ({
  //         ebayItemId: itemId,
  //         amount: parseFloat(finalPrice),
  //         date: new Date(endTime).toISOString().split('T')[0],
  //       })),
  //       validTransactionsCount: approvals.length,
  //       value: approvals.reduce((p, c) => (p += parseFloat(c.finalPrice)), 0) / approvals.length || 0,
  //       high: approvals
  //         .map(({ finalPrice, endTime }) => ({ finalPrice, endTime }))
  //         .sort((a, b) => parseFloat(b.finalPrice) - parseFloat(a.finalPrice))[0] || {
  //         finalPrice: 'no data',
  //         endTime: 'no data',
  //       },
  //       low: approvals
  //         .map(({ finalPrice, endTime }) => ({ finalPrice, endTime }))
  //         .sort((a, b) => parseFloat(a.finalPrice) - parseFloat(b.finalPrice))[0] || {
  //         finalPrice: 'no data',
  //         endTime: 'no data',
  //       },
  //       last: approvals.map(({ finalPrice, endTime }) => ({ finalPrice, endTime }))[approvals.length - 1] || {
  //         finalPrice: 'no data',
  //         endTime: 'no data',
  //       },
  //       pendingApprovalCount,
  //     },
  //   };
  // }

  async getById(issueId, user: User) {
    const inventory = (await this.inventoryService.get(user)).filter(item => item.comicId == issueId);
    const portfolio = [];
    for (let i = 0; i < inventory.length; i++) {
      const portfolioItem = await this.getPortfolioItem(inventory[i], user);
      portfolio.push(portfolioItem);
    }

    const portfolioChart = {
      cost: portfolio
        .map(({ inventory }) => ({
          id: inventory.id,
          date: inventory.date,
          amount: parseFloat(inventory.amount),
        }))
        .sort((a, b) => b.date - a.date),
    };

    const totalCost = portfolio
      .map(({ inventory }) => ({
        id: inventory.id,
        date: inventory.date,
        amount: parseFloat(inventory.amount),
      }))
      .reduce((prev, curr) => (prev += curr.amount), 0);

    const averageCost =
      portfolio
        .map(({ inventory }) => ({
          amount: parseFloat(inventory.amount),
        }))
        .reduce((prev, curr) => (prev += curr.amount), 0) / portfolio.length;

    return {
      meta: {
        title:
          portfolio[0].comic.seriesName + ' (' + portfolio[0].comic.volume + ') ' + '#' + portfolio[0].comic.number,
        copies: portfolio.length,
        totalCost,
        averageCost,
      },
      portfolioChart,
      portfolio,
    };
  }

  async getPortfolioItem(inventory: Inventory, user: User) {
    const comic = await this.gcdApiService.getById(inventory.comicId, user);
    const approvals = await this.approvalService.getCompletedByApproved(inventory.id, user);
    const pendingApprovalCount = await this.approvalService.getPendingCount(inventory.id, user);

    const issueId = inventory.comicId;
    const description = comic.series.name + ' (' + comic.series.year_began + ') ' + '#' + comic.number;
    const value = approvals.reduce((p, c) => (p += parseFloat(c.finalPrice)), 0) / approvals.length;
    const cost = inventory.cost;
    const hasGains = value >= cost ? true : false;
    const chartData = approvals.map(({ finalPrice, endTime }) => ({ date: endTime, amt: parseFloat(finalPrice) }));

    return {
      issueId,
      description,
      pendingApprovalCount,
      cost,
      value,
      hasGains,
      chartData,
    };
  }

  async get(user: User) {
    const inventory = await this.inventoryService.get(user);
    const portfolio = [];
    for (let i = 0; i < inventory.length; i++) {
      const portfolioItem = await this.getPortfolioItem(inventory[i], user);
      portfolio.push(portfolioItem);
    }

    const valueAnalyticListData = {
      type: 'Highest Value',
      list: portfolio
        .sort((a, b) => b.value - a.value)
        .slice(0, 3)
        .map(({ issueId, description, value }) => ({ issueId, description, value })),
    };

    const reviewAnalyticListData = {
      type: 'Waiting Review',
      list: portfolio
        .sort((a, b) => b.pendingApprovalCount - a.pendingApprovalCount)
        .slice(0, 3)
        .map(({ issueId, description, pendingApprovalCount }) => ({
          issueId,
          description,
          value: pendingApprovalCount,
        })),
    };

    const portfolioValue = portfolio.reduce((p, c) => (p += c.value), 0);
    const portfolioCost = portfolio.reduce((p, c) => (p += parseFloat(c.cost)), 0);
    const chartData = portfolio.reduce((p, c) => p.concat(c.chartData), []).sort((a, b) => b.date > a.date);

    const portfolioChartData = {
      value: (portfolioValue || 0).toFixed(2),
      cost: portfolioCost || 0,
      hasGains: portfolioValue >= portfolioCost ? true : false,
      chartData,
    };

    return {
      portfolioChartData,
      valueAnalyticListData,
      reviewAnalyticListData,
      portfolioListData: portfolio,
    };
  }

  // async get(user: User) {
  //   const inventory = await this.inventoryService.get(user);

  //   const portfolio = [];
  //   for (let i = 0; i < inventory.length; i++) {
  //     const portfolioItem = await this.getPortfolioItem(inventory[i], user);
  //     portfolio.push(portfolioItem);
  //   }

  //   const topThreeValue = portfolio
  //     .sort((a, b) => b.inventory.value - a.inventory.value)
  //     .slice(0, 3)
  //     .map(({ comic: { issueId, seriesName, volume, number }, inventory: { id, value } }) => ({
  //       issueId,
  //       title: seriesName + ' (' + volume + ') ' + '#' + number,
  //       data: value.toFixed(2),
  //     }));

  //   const topThreePending = portfolio
  //     .sort((a, b) => b.inventory.pendingApprovalCount - a.inventory.pendingApprovalCount)
  //     .slice(0, 3)
  //     .map(({ comic: { issueId, seriesName, volume, number }, inventory: { id, pendingApprovalCount } }) => ({
  //       issueId,
  //       title: seriesName + ' (' + volume + ') ' + '#' + number,
  //       data: pendingApprovalCount,
  //     }));

  //   const portfolioChart = {
  //     cost: portfolio
  //       .map(({ inventory }) => ({
  //         id: inventory.id,
  //         date: inventory.date,
  //         amount: parseFloat(inventory.amount),
  //       }))
  //       .sort((a, b) => b.date - a.date),
  //   };

  //   const portfolioValue = portfolio.reduce((prev, curr) => (prev += curr.inventory.value), 0);

  //   return {
  //     portfolioValue,
  //     portfolioChart,
  //     portfolio,
  //     topThreeValue,
  //     topThreePending,
  //   };
  // }
}
