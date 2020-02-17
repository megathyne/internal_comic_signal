import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConditionRepository } from './condition.repository';
import { Condition } from './condition.entity';

@Injectable()
export class ConditionService {
  private logger = new Logger('ConditionService');

  constructor(@InjectRepository(ConditionRepository) private conditionRepository: ConditionRepository) {}

  async getCondition(): Promise<Condition[]> {
    return await this.conditionRepository.find();
  }
}
