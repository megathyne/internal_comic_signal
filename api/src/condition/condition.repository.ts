import { EntityRepository, Repository, Entity } from 'typeorm';
import { Condition } from './condition.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Condition)
export class ConditionRepository extends Repository<Condition> {
  private logger = new Logger('ConditionRepository');
}
