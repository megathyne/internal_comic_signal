import { Module } from '@nestjs/common';
import { GraderService } from './grader.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraderRepository } from './grader.repository';
import { GraderController } from './grader.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GraderRepository])],
  providers: [GraderService],
  controllers: [GraderController],
  exports: [GraderService, TypeOrmModule],
})
export class GraderModule {}
