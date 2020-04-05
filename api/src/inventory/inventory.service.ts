import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from './inventory.entity';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { User } from '../auth/user.entity';
import { GetInventoryFilterDto } from './dto/get-inventory-filter.dto';
import { GcdApiService } from 'src/gcd-api/gcd-api.service';
import { In } from 'typeorm';

@Injectable()
export class InventoryService {
  private logger = new Logger('InventoryService');

  constructor(
    @InjectRepository(InventoryRepository)
    private inventoryRepository: InventoryRepository,

    private gcdApiService: GcdApiService,
  ) {}

  async getInventory(filterDto: GetInventoryFilterDto, user: User): Promise<Inventory[]> {
    return await this.inventoryRepository.getInventory(filterDto, user);
  }

  async getInventoryById(id: number, user: User): Promise<Inventory> {
    try {
      const found = await this.inventoryRepository.findOne({ where: { id, userId: user.id } });

      if (!found) {
        this.logger.error(`Inventory with ID "${id}" not found`);
        throw new NotFoundException(`Inventory with ID "${id}" not found`);
      }

      return found;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getCostsSum(user: User): Promise<Number> {
    return this.inventoryRepository.getCostsSum(user);
  }

  async postInventory(createInventoryDto: CreateInventoryDto, user: User): Promise<Inventory> {
    return this.inventoryRepository.createInventory(createInventoryDto, user);
  }

  async patchInventory(id: number, updateInventoryDto: UpdateInventoryDto, user: User): Promise<Inventory> {
    const inventory = await this.getInventoryById(id, user);
    inventory.bin = updateInventoryDto.bin;
    inventory.tag = updateInventoryDto.tag;
    inventory.cost = updateInventoryDto.cost;
    inventory.acquired = updateInventoryDto.acquired;
    inventory.notes = updateInventoryDto.notes;
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

  async getPortfolio(user: User) {
    const inventory = await this.inventoryRepository.find({ where: { userId: user.id } });
    const results = await Promise.all(inventory.map(x => this.gcdApiService.getById(x.comicId, user)));

    const groupedBySeries = results.reduce((prev, curr) => {
      (prev[`${curr.series.name} (${curr.series.year_began}) #${curr.number}`] =
        prev[`${curr.series.name} (${curr.series.year_began}) #${curr.number}`] || []).push(curr.id);

      return prev;
    }, {});

    const final = Object.keys(groupedBySeries).map(key => ({
      name: key,
      copies: groupedBySeries[key],
    }));

    return final;
  }

  async getPortfolioItem(data: string[], user: User) {
    const results = [];
    const inventory = await this.inventoryRepository.find({
      where: {
        userId: user.id,
        comicId: In(data),
      },
    });

    const comics = await Promise.all(inventory.map(x => this.gcdApiService.getById(x.comicId, user)));
    const covers = await Promise.all(inventory.map(x => this.gcdApiService.getCoverById(x.comicId, user)));

    for (let i = 0; i < inventory.length; i++) {
      results.push({ ...inventory[i], comic: comics[i], cover: covers[i] });
    }
    return results;
  }
}
