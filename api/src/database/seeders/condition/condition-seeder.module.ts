import { Module, Logger } from '@nestjs/common';
import { ConditionModule } from 'src/condition/condition.module';
import { ConditionSeederService } from './condition-seeder.service';

@Module({
  imports: [ConditionModule, Logger],
  providers: [ConditionSeederService],
  exports: [ConditionSeederService],
})
export class ConditionSeederModule {}
