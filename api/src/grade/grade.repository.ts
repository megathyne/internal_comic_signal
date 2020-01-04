import { EntityRepository, Repository, Entity } from 'typeorm';
import { Grade } from './grade.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Grade)
export class GradeRepository extends Repository<Grade> {
  private logger = new Logger('GradeRepository');
}
