import { Injectable, Logger } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { InventoryService } from 'src/inventory/inventory.service';
import { GetInventoryFilterDto } from 'src/inventory/dto/get-inventory-filter.dto';
import { ApprovalService } from 'src/approval/approval.service';

@Injectable()
export class AnalyticsService {
  private logger = new Logger('AnalyticsService');

  constructor(private readonly inventoryService: InventoryService, private readonly approvalService: ApprovalService) {}

  async getTotalCosts(user: User): Promise<Number> {
    return await this.inventoryService.getCostsSum(user);
  }

  async getTotalValue(user: User): Promise<any> {
    const getInventoryFilterDto: GetInventoryFilterDto = {
      search: null,
    };
    const inventory = await this.inventoryService.getInventory(getInventoryFilterDto, user);

    let ebayItems = [];
    for (let i = 0; i < inventory.length; i++) {
      const results = await this.approvalService.getCompletedByApproved(inventory[i].id, user);
      if (results.length > 0) {
        ebayItems = ebayItems.concat(results);
      }
    }

    console.log(ebayItems.length);
    const totalValue = ebayItems.reduce((prev, curr) => {
      return (prev += parseFloat(curr.finalPrice.split('$')[1]) + parseFloat(curr.shippingCost.split('$')[1]));
    }, 0);

    return { valueSum: totalValue };
  }
}
