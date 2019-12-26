import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from './inventory.entity';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { User } from '../auth/user.entity';
import { GetInventoryFilterDto } from './dto/get-inventory-filter.dto';

@Injectable()
export class InventoryService {
  private logger = new Logger('InventoryService');

  constructor(
    @InjectRepository(InventoryRepository)
    private inventoryRepository: InventoryRepository,
  ) {}

  async getInventory(filterDto: GetInventoryFilterDto, user: User): Promise<Inventory[]> {
    return await this.inventoryRepository.getInventory(filterDto, user);
  }

  async getInventoryById(id: number, user: User): Promise<Inventory> {
    const found = await this.inventoryRepository.findOne({ where: { id, userId: user.id } });

    if (!found) {
      this.logger.error(`Inventory with ID "${id}" not found`);
      throw new NotFoundException(`Inventory with ID "${id}" not found`);
    }

    return found;
  }

  async postInventory(createInventoryDto: CreateInventoryDto, user: User) {
    return this.inventoryRepository.createInventory(createInventoryDto, user);
  }

  async patchInventory(id: number, updateInventoryDto: UpdateInventoryDto, user: User): Promise<Inventory> {
    const inventory = await this.getInventoryById(id, user);
    inventory.bin = updateInventoryDto.bin;
    inventory.quantity = updateInventoryDto.quantity;
    await inventory.save();
    return inventory;
  }

  async deleteInventory(id: number, user: User): Promise<void> {
    const result = await this.inventoryRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Inventory with ID "${id}" not found`);
    } else {
      this.logger.log(`Inventory with ID "${id}" deleted`);
    }
  }
}
