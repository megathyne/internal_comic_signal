import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConditionRepository } from 'src/condition/condition.repository';
import { conditionData } from './condition-data';

@Injectable()
export class ConditionSeederService {
  private logger = new Logger(`ConditionSeederService`);

  constructor(
    @InjectRepository(ConditionRepository)
    private condtionRepository: ConditionRepository,
  ) {}

  async create(): Promise<void> {
    try {
      for (let i = 0; i < conditionData.length; i++) {
        const element = conditionData[i];
        const existing = await this.condtionRepository.findOne({
          where: { numerical: element.numerical },
        });

        if (!existing) {
          const condition = this.condtionRepository.create(element);
          const results = await condition.save();
          this.logger.log(`Condition: ${results.numerical} - Created`);
        } else {
          this.logger.log(`Condition: ${element.numerical} - Exists`);
        }
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }
}
