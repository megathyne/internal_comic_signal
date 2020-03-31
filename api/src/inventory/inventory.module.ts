import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';
import { AuthModule } from '../auth/auth.module';
import { GcdApiModule } from 'src/gcd-api/gcd-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryRepository]), AuthModule, GcdApiModule],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService, TypeOrmModule],
})
export class InventoryModule {}
