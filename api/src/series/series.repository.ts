import { EntityRepository, Repository } from 'typeorm';
import { Series } from './series.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { GetSeriesFilterDto } from './dto/get-series-filter.dto';

@EntityRepository(Series)
export class SeriesRepository extends Repository<Series> {
  private logger = new Logger('SeriesRepository');

  async getSeries(filterDto: GetSeriesFilterDto): Promise<Series[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('series');

    if (search) {
      query.where('(series.name LIKE :search)', { search: `%${search}%` });
      query.orWhere('(CAST(series.volume AS varchar) LIKE :search)', { search: `%${search}%` });
    }

    try {
      const series = await query.getMany();
      return series;
    } catch (error) {
      this.logger.error(`Failed to get series.  Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
