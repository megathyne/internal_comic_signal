import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalRepository } from './approval.repository';
import { AuthModule } from '../auth/auth.module';
import { ApprovalController } from './approval.controller';
import { ApprovalService } from './approval.service';
import { EbayApiModule } from 'src/ebay-api/ebay-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApprovalRepository]), AuthModule, EbayApiModule],
  controllers: [ApprovalController],
  providers: [ApprovalService],
})
export class ApprovalModule {}
