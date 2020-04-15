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

  async getByIssueId(issueId, user: User) {
    const comic = await this.gcdApiService.getById(issueId, user);
    const comicImage = await this.gcdApiService.getCoverById(issueId, user);
    const inventory = (await this.inventoryService.get(user)).filter(item => item.comicId == issueId);

    const portfolio = [];
    for (let i = 0; i < inventory.length; i++) {
      const portfolioItem = await this.getPortfolioItem(inventory[i], user);
      portfolio.push(portfolioItem);
    }

    const description = comic.series.name + ' (' + comic.series.year_began + ') ' + '#' + comic.number;
    const portfolioValue = portfolio.reduce((p, c) => (p += c.value), 0);
    const portfolioCost = portfolio.reduce((p, c) => (p += parseFloat(c.cost)), 0);
    const chartData = portfolio.reduce((p, c) => p.concat(c.chartData), []).sort((a, b) => b.date > a.date);

    const comicDescriptionData = {
      description,
      hasGains: portfolioValue >= portfolioCost ? true : false,
      chartData,
    };

    const comicImageData = {
      image: comicImage.small,
    };

    const averageCost =
      portfolio
        .map(({ inventory }) => ({
          amount: parseFloat(inventory.amount),
        }))
        .reduce((prev, curr) => (prev += curr.amount), 0) / portfolio.length;

    const totalCost = portfolio
      .map(({ inventory }) => ({
        id: inventory.id,
        date: inventory.date,
        amount: parseFloat(inventory.amount),
      }))
      .reduce((prev, curr) => (prev += curr.amount), 0);

    const comicStatsData = {
      copies: inventory.length,
      averageCost,
      totalCost,
      averageValue: 0,
      totalValue: 0,
    };

    const comicInventoryData = [];

    return {
      comicDescriptionData,
      comicImageData,
      comicStatsData,
      comicInventoryData,
    };
  }

  async getById(issueId, user: User) {
    console.log('======', issueId);
    const inventory = (await this.inventoryService.get(user)).filter(item => item.comicId == issueId);
    const portfolio = [];
    for (let i = 0; i < inventory.length; i++) {
      const portfolioItem = await this.getPortfolioItem(inventory[i], user);
      portfolio.push(portfolioItem);
    }
    console.log(1);
    console.log(portfolio);
    const portfolioChart = {
      cost: portfolio
        .map(({ inventory }) => ({
          date: inventory.acquired,
          amount: parseFloat(inventory.amount),
        }))
        .sort((a, b) => b.date - a.date),
    };
    console.log(2);
    const totalCost = portfolio
      .map(({ inventory }) => ({
        date: inventory.acquired,
        amount: parseFloat(inventory.amount),
      }))
      .reduce((prev, curr) => (prev += curr.amount), 0);
    console.log(3);
    const averageCost =
      portfolio
        .map(({ inventory }) => ({
          amount: parseFloat(inventory.amount),
        }))
        .reduce((prev, curr) => (prev += curr.amount), 0) / portfolio.length;
    console.log(4);
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
    const value =
      approvals.length > 0 ? approvals.reduce((p, c) => (p += parseFloat(c.finalPrice)), 0) / approvals.length : 0;
    const cost = inventory.cost;
    const hasGains = value >= cost ? true : false;
    const chartData = approvals.map(({ finalPrice, endTime }) => ({ date: endTime, amt: parseFloat(finalPrice) }));

    const high =
      approvals.length > 0
        ? approvals.reduce((p, c) => (p > parseFloat(c.finalPrice) ? p : parseFloat(c.finalPrice)), 0)
        : 0;
    const low =
      approvals.length > 0
        ? approvals.reduce((p, c) => (p < parseFloat(c.finalPrice) ? p : parseFloat(c.finalPrice)), 0)
        : 0;
    const last = approvals.length > 0 ? approvals[approvals.length - 1].finalPrice : 0;

    return {
      condition: inventory.condition.name,
      acquired: inventory.acquired,
      issueId,
      description,
      pendingApprovalCount,
      cost,
      value,
      hasGains,
      chartData,
      copies: 1,
      high,
      low,
      last,
      totalApproved: approvals.length,
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
        .map(({ issueId, description, value }) => ({
          issueId,
          description,
          value: `$${value.toFixed(2)}`,
        })),
    };

    const reviewAnalyticListData = {
      type: 'Waiting Review',
      list: portfolio
        .sort((a, b) => b.pendingApprovalCount - a.pendingApprovalCount)
        .slice(0, 3)
        .map(({ issueId, description, pendingApprovalCount }) => ({
          issueId,
          description,
          value: pendingApprovalCount.toFixed(),
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
}
