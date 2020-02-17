import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraderRepository } from './grader.repository';
import { Grader } from './grader.entity';

@Injectable()
export class GraderService {
  private logger = new Logger('GraderService');

  constructor(@InjectRepository(GraderRepository) private graderRepository: GraderRepository) {}

  async getGrader(): Promise<Grader[]> {
    return await this.graderRepository.find();
  }
}
