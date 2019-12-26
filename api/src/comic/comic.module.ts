import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComicRepository } from './comic.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ComicRepository])],
  providers: [ComicService],
  controllers: [ComicController],
})
export class ComicModule {}
