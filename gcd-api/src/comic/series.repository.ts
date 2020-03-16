import { EntityRepository, Repository, getManager } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Series } from './series.entity';

@EntityRepository(Series)
export class SeriesRepository extends Repository<Series> {
  private logger = new Logger('SeriesRepository');

  async getSeries(search: string): Promise<Series[]> {
    try {
        this.logger.log('In the try statement');
        this.logger.log(`Search value: ${search}`);
        const query = this.createQueryBuilder('gcd_series');
        query.select('name');
    //   query.where(`MATCH(name) AGAINST('Spider')`);
    //   query.where('MATCH(name) AGAINST(:search)', { search: `${search}` });
    //   query.andWhere('language_id=25');
    //   query.andWhere('country_id=225');
    //   query.andWhere('publisher_id=78');
    //   query.andWhere('is_singleton=0');
    //   query.andWhere('publishing_format <> "One-Shot"');
    //   query.andWhere('publishing_format <> "collected_edition"');
    //   query.orderBy('year_began');

        const result = await query.getMany();
        this.logger.log(`RESULT: ${result}`);
        return result;
    } catch (error) {
      this.logger.error('Error in GET SERIES', error);
    }
  }
}
