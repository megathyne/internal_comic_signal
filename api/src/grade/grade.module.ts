import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeRepository } from './grade.repository';
import { GradeController } from './grade.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GradeRepository])],
  providers: [GradeService],
  controllers: [GradeController],
})
export class GradeModule {}
