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
    private ebayApiService: EbayApiService,
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
          amount: finalPrice,
          date: endTime,
        })),
        value: approvals.reduce((p, c) => (p += parseFloat(c.finalPrice)), 0) / approvals.length,
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

    const topThreeValue = portfolio.sort((a, b) => b.inventory.value - a.inventory.value).slice(0, 3);

    const topThreePending = portfolio.sort(
      (a, b) => b.inventory.pendingApprovalCount - a.inventory.pendingApprovalCount,
    );

    return {
      portfolio,
      topThreeValue,
      topThreePending,
    };
  }

  async getold(user: User) {
    const inventory = await this.inventoryService.get(user);
    /* 
                { id: 1, comicId: 3454, cost: 23.50, acquired: '2020-02-02 }
            */

    const comics = await Promise.all(inventory.map(x => this.gcdApiService.getById(x.comicId, user)));

    /* 
                { id: 3454, issueNumber: 54, series: { name; 'foofoo comics', year_began: 1999 } }
            */

    const approvals = await Promise.all(inventory.map(x => this.approvalService.getCompletedByApproved(x.id, user)));
    /* 
                { id: 70, inventoryId: 1, ebayId: 234234234, approved: true},
                { id: 70, inventoryId: 1, ebayId: 234234234, approved: true},
                { id: 70, inventoryId: 1, ebayId: 234234234, approved: true},
                { id: 70, inventoryId: 1, ebayId: 234234234, approved: true},
            */

    const inventoryWithComics = [];
    for (let i = 0; i < inventory.length; i++) {
      inventoryWithComics.push({ ...inventory[i], comic: comics[i], approvals: approvals[i] });
    }

    const groupedBySeries = inventoryWithComics.reduce((prev, curr) => {
      (prev[`${curr.comic.series.name} (${curr.comic.series.year_began}) #${curr.comic.number}`] =
        prev[`${curr.comic.series.name} (${curr.comic.series.year_began}) #${curr.comic.number}`] || []).push(curr);

      return prev;
    }, {});

    const final = Object.keys(groupedBySeries).map(key => ({
      comicName: key,
      cost: groupedBySeries[key].map(({ id, cost, acquired }) => ({ id, cost, acquired })),
      value: groupedBySeries[key].map(({ approvals }) =>
        approvals.map(({ itemId, finalPrice, endTime }) => ({ itemId, finalPrice, endTime })),
      ),
    }));

    // Below contains 3 copies in the inventory
    //

    let retVal = [
      {
        comicName: 'Amazing Spider-Man 78',
        cost: [
          { id: 1, date: '2020-02-01', amount: 23.22 },
          { id: 2, date: '2019-02-01', amount: 10.22 },
          { id: 3, date: '2018-02-01', amount: 12.22 },
        ],
        value: [
          { ebayItemId: '4325234', date: '2020-02-01', amount: 33.33 },
          { ebayItemId: '1321321', date: '2020-02-01', amount: 33.33 },
          { ebayItemId: '4234323', date: '2020-02-01', amount: 33.33 },
          { ebayItemId: '6454565', date: '2020-02-01', amount: 33.33 },
        ],
      },
    ];

    let retVa2 = [
      {
        comicName: 'Amazing Spider-Man 78',
        inventory: {
          id: 1,
          date: '2020-02-01',
          amount: 23.22,
          validTransactions: [
            { ebayItemId: '4325234', date: '2020-02-01', amount: 33.33 },
            { ebayItemId: '1321321', date: '2020-02-01', amount: 33.33 },
            { ebayItemId: '4234323', date: '2020-02-01', amount: 33.33 },
            { ebayItemId: '6454565', date: '2020-02-01', amount: 33.33 },
          ],
        },
      },
    ];

    return final;
  }
}
