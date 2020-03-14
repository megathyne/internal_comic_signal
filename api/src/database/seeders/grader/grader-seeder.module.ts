import { Module, Logger } from '@nestjs/common';
import { GraderModule } from 'src/grader/grader.module';
import { GraderSeederService } from './grader-seeder.service';

@Module({
  imports: [GraderModule, Logger],
  providers: [GraderSeederService],
  exports: [GraderSeederService],
})
export class GraderSeederModule {}
