import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from '../inventory/inventory.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class AnalyticsService {
  private logger = new Logger('AnalyticsService');

  constructor(@InjectRepository(InventoryRepository) private inventoryRepository: InventoryRepository) {}

  async getTotalCosts(user: User): Promise<Number> {
    return await this.inventoryRepository.getCostsSum(user);
  }
}
