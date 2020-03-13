import { Injectable, Logger } from '@nestjs/common';
import { GraderRepository } from 'src/grader/grader.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { graderData } from './grader-data';

@Injectable()
export class GraderSeederService {
  private logger = new Logger(`GraderSeederService`);

  constructor(
    @InjectRepository(GraderRepository)
    private graderRepository: GraderRepository,
  ) {}

  async create(): Promise<void> {
    try {
      for (let i = 0; i < graderData.length; i++) {
        const element = graderData[i];
        const existing = await this.graderRepository.findOne({
          where: { code: element.code },
        });

        if (!existing) {
          const grader = this.graderRepository.create(element);
          const result = await grader.save();
          this.logger.log(`Condition: ${result.code} - Created`);
        } else {
          this.logger.log(`Condition: ${element.code} - Created`);
        }
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }
}
