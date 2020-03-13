import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageRepository } from './page.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PageRepository]), AuthModule],
  providers: [PageService, TypeOrmModule],
  controllers: [PageController],
  exports: [PageService, TypeOrmModule],
})
export class PageModule {}
