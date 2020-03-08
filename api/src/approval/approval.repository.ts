import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Approval } from './approval.entity';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { User } from '../auth/user.entity';
import { Inventory } from '../inventory/inventory.entity';

@EntityRepository(Approval)
export class ApprovalRepository extends Repository<Approval> {
  private logger = new Logger('ApprovalRepository');

  async createApproval(createApprovalDto: CreateApprovalDto, user: User): Promise<Approval> {
    try {
      const { inventoryId, ebayItemId, isApproved } = createApprovalDto;

      const inventory = await Inventory.findOne(inventoryId);

      const approval = this.create();
      approval.user = user;
      approval.inventory = inventory;
      approval.ebayItemId = ebayItemId;
      approval.isApproved = isApproved;

      const item = await approval.save();
      return item;
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error(`Failed to create, already exists!`, error.stack);
      }
    }
  }
}
