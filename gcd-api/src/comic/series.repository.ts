import { EntityRepository, Repository, getManager } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Series } from './series.entity';

@EntityRepository(Series)
export class SeriesRepository extends Repository<Series> {
  private logger = new Logger('SeriesRepository');

  async getSeries(search: string): Promise<Series[]> {
    try {
      let fullTextSearch = search
        .split(' ')
        .map(word => `+${word}`)
        .join(' ');

      this.logger.log('In the try statement');
      this.logger.log(`Search value: ${search}`);
      const query = this.createQueryBuilder('gcd_series');
      query.select('gcd_series.year_began');
      query.addSelect('gcd_series.name');
      
      
      query.where(`MATCH(name) AGAINST(:search IN BOOLEAN MODE)`, {
        search: `${fullTextSearch}`,
      });
      query.andWhere('gcd_series.language_id=25');
      query.andWhere('gcd_series.country_id=225');
      query.andWhere('gcd_series.publisher_id=78');
      query.andWhere('gcd_series.is_singleton=0');
      query.andWhere('gcd_series.publishing_format <> "One-Shot"');
      query.andWhere('gcd_series.publishing_format <> "collected_edition"');
      query.orderBy('year_began');

      const rawquery = await query.getQuery();
      this.logger.log(`QUERY: ${rawquery}`);
      const result = await query.getMany();
      return result;
    } catch (error) {
      this.logger.error('Error in GET SERIES', error);
    }
  }
}
