import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Logger, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { GetInventoryFilterDto } from './dto/get-inventory-filter.dto';
import { User } from '../auth/user.entity';
import { Vendor } from '../vendor/vendor.entity';
import { Grade } from '../grade/grade.entity';
import { Issue } from '../issue/issue.entity';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
  private logger = new Logger('InventoryRepository');

  async getInventory(filterDto: GetInventoryFilterDto, user: User): Promise<Inventory[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('inventory');
    query.innerJoinAndSelect('inventory.issue', 'issue');
    query.innerJoinAndSelect('issue.series', 'series');
    query.leftJoinAndSelect('inventory.vendor', 'vendor');
    query.leftJoinAndSelect('inventory.grade', 'grade');
    query.where('inventory.userId = :userId', { userId: user.id });

    if (search) {
      query.andWhere(
        '(inventory.issue LIKE :search OR inventory.bin LIKE :search OR inventory.cost LIKE :search OR inventory.notes LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const inventory = await query.getMany();
      return inventory;
    } catch (error) {
      this.logger.error(
        `Failed to get inventory for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getCostsSum(user: User): Promise<Number> {
    const query = this.createQueryBuilder('inventory');
    query.select('SUM(inventory.cost)', 'sum');
    query.where('inventory.userId = :userId', { userId: user.id });

    try {
      const { sum } = await query.getRawOne();
      return sum;
    } catch (error) {
      this.logger.error(`Failed to calculate total inventory costs for user "${user.username}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createInventory(createInventoryDto: CreateInventoryDto, user: User): Promise<Inventory> {
    const { bin, issueId, tag, cost, aquired, notes, vendorId, gradeId } = createInventoryDto;

    const issue = await Issue.findOne(issueId);
    if (!issue) {
      this.logger.error(`Faild to create an inventory for UserId: ${user.id}, IssueId: ${issueId} does not exist`);
      throw new BadRequestException();
    }

    const vendor = await Vendor.findOne(vendorId);
    if (!vendor) {
      this.logger.error(`Faild to create an inventory for UserId: ${user.id}, VendorId: ${vendorId} does not exist`);
      throw new BadRequestException();
    }

    const grade = await Grade.findOne(gradeId);

    const inventory = this.create();
    inventory.bin = bin;
    inventory.tag = tag;
    inventory.issue = issue;
    inventory.grade = grade;
    inventory.vendor = vendor;
    inventory.cost = cost;
    inventory.aquired = aquired;
    inventory.user = user;
    inventory.notes = notes;

    try {
      const item = await inventory.save();
      delete item.user;
      return item;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate comic
        this.logger.error(
          `Failed to create a inventory for UserId: ${user.id}, Comic already exists. Data: ${JSON.stringify(
            createInventoryDto,
          )}`,
          error.stack,
        );
        throw new ConflictException('Comic already exists');
      }

      this.logger.error(
        `Failed to create a inventory for UserId: ${user.id}. Data: ${createInventoryDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
