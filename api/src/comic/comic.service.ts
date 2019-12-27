import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComicRepository } from './comic.repository';
import { CreateComicDto } from './dto/create-comic.dto';
import { GetComicFilterDto } from './dto/get-comic-filter.dto';
import { Comic } from './comic.entity';

@Injectable()
export class ComicService {
  private logger = new Logger('ComicService');

  constructor(@InjectRepository(ComicRepository) private comicRepository: ComicRepository) {}

  async getComic(filterDto: GetComicFilterDto): Promise<Comic[]> {
    return await this.comicRepository.getComic(filterDto);
  }

  async getComicById(id: number): Promise<Comic> {
    const found = await this.comicRepository.findOne({ where: { id } });

    if (!found) {
      this.logger.error(`Comic with ID "${id}" not found`);
      throw new NotFoundException(`Inventory with ID "${id}" not found`);
    }

    return found;
  }

  async postComic(createComicDto: CreateComicDto): Promise<void> {
    return this.comicRepository.createComic(createComicDto);
  }

  async deleteComic(id: number): Promise<void> {
    const result = await this.comicRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Comic with ID "${id}" not found`);
    } else {
      this.logger.log(`Comic with ID "${id}" deleted`);
    }
  }
}
