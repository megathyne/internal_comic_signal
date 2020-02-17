import { EntityRepository, Repository, Entity } from 'typeorm';
import { Grader } from './grader.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Grader)
export class GraderRepository extends Repository<Grader> {
  private logger = new Logger('GraderRepository');
}
