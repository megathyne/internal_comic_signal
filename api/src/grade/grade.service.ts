import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeRepository } from './grade.repository';
import { Grade } from './grade.entity';

@Injectable()
export class GradeService {
  private logger = new Logger('GradeService');

  constructor(@InjectRepository(GradeRepository) private gradeRepository: GradeRepository) {}

  async getGrade(): Promise<Grade[]> {
    return await this.gradeRepository.find();
  }
}
