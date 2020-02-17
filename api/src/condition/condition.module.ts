import { Module } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConditionRepository } from './condition.repository';
import { ConditionController } from './condition.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConditionRepository])],
  providers: [ConditionService],
  controllers: [ConditionController],
})
export class ConditionModule {}
