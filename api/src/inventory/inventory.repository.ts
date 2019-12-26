import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Logger, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { GetInventoryFilterDto } from './dto/get-inventory-filter.dto';
import { User } from '../auth/user.entity';
import { Comic } from '../comic/comic.entity';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
  private logger = new Logger('InventoryRepository');

  async getInventory(filterDto: GetInventoryFilterDto, user: User): Promise<Inventory[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('inventory');

    query.innerJoinAndSelect('inventory.comic', 'comic');

    query.where('inventory.userId = :userId', { userId: user.id });

    if (search) {
      query.andWhere(
        '(inventory.comic LIKE :search OR inventory.bin LIKE :search OR inventory.quantity LIKE :search)',
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

  async createInventory(createInventoryDto: CreateInventoryDto, user: User): Promise<void> {
    const { bin, comicId, quantity } = createInventoryDto;

    const comic = await Comic.findOne(comicId);

    const inventory = this.create();
    inventory.bin = bin;
    inventory.comic = comic;
    inventory.quantity = quantity;
    inventory.user = user;

    try {
      await inventory.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate comic
        this.logger.error(
          `Failed to create a inventory, Comic already exists. Data: ${JSON.stringify(createInventoryDto)}`,
          error.stack,
        );
        throw new ConflictException('Comic already exists');
      }

      this.logger.error(
        `Failed to create a inventory for user "${user.username}". Data: ${createInventoryDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
