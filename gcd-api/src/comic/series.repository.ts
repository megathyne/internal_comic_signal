import { EntityRepository, Repository, getManager, Connection } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Series } from './series.entity';

@EntityRepository(Series)
export class SeriesRepository extends Repository<Series> {
  private logger = new Logger('SeriesRepository');

  async getSeries(series: string, issue: number): Promise<any> {
    try {
      
      interface RawComicResult {
        series_id: number;
        issue_id: number;
        year_began: number;
        series_name: string;
      }
      const rawResult = await this.query(`
        SELECT gcd_series_id AS series_id, 
              gcd_issue_id AS issue_id, 
              gcd_series_year_began AS year_began, 
              gcd_series_name AS series_name
        FROM
            (SELECT gs.id                        AS gcd_series_id,
                    gs.name                      AS gcd_series_name,
                    gs.year_began                AS gcd_series_year_began,
                    gi.number                    AS gcd_issue_number,
                    gi.id                        AS gcd_issue_id,
                    (CASE
                          WHEN gs.name = '${series}' then 5
                          WHEN gs.name LIKE '%${series}' then 4
                          WHEN gs.name LIKE '${series}%' then 4
                          ELSE 0
                        END) AS SEARCH_WEIGHT,
                    gi.variant_name
              FROM gcd_series gs
            INNER JOIN gcd_issue gi ON gs.id = gi.series_id
              WHERE gi.number = ${issue}
                AND gs.language_id = 25
                AND gs.country_id = 225) RESULTS
        WHERE SEARCH_WEIGHT > 0
        ORDER BY SEARCH_WEIGHT DESC, gcd_series_year_began ASC
        LIMIT 20
      `) as RawComicResult[];

               

      //console.log(result);
      const result = rawResult.map(x => {
        return {
          seriesId: x.series_id,
          issueId: x.issue_id,
          yearBegan: x.year_began,
          seriesName: x.series_name
        }
      })
      return result;
    } catch (error) {
      this.logger.error('Error in GET SERIES', error);
    }
  }
}
