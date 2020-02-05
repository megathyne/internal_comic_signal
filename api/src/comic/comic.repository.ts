import { EntityRepository, Repository } from 'typeorm';
import { Comic } from './comic.entity';
import { Logger, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateComicDto } from './dto/create-comic.dto';
import { GetComicFilterDto } from './dto/get-comic-filter.dto';

@EntityRepository(Comic)
export class ComicRepository extends Repository<Comic> {
  private logger = new Logger('ComicRespository');

  async getComic(filterDto: GetComicFilterDto): Promise<Comic[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('comic');

    if (search) {
      query.where('(comic.series LIKE :search)', { search: `%${search}%` });
      query.andWhere('(comic.volume LIKE :search)', { search: `%${search}%` });
    }

    try {
      const comic = await query.getMany();
      return comic;
    } catch (error) {
      this.logger.error(`Failed to get comic. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createComic(createComicDto: CreateComicDto): Promise<void> {
    const { series, volume, issue, notes } = createComicDto;
    const comic = this.create();
    comic.series = series;
    comic.volume = volume;
    comic.issue = issue;
    comic.notes = notes;

    try {
      await comic.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate comic
        this.logger.error(
          `Failed to create a inventory, Comic already exists. Data: ${JSON.stringify(createComicDto)}`,
          error.stack,
        );
        throw new ConflictException('Comic already exists');
      }

      this.logger.error(`Failed to create a comic. Data: ${createComicDto}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
