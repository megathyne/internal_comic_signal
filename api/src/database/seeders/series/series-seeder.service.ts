import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeriesRepository } from 'src/series/series.repository';
import { seriesData } from './series-data';

@Injectable()
export class SeriesSeederService {
  private logger = new Logger(`SerieSeederService`);

  constructor(
    @InjectRepository(SeriesRepository)
    private seriesRepository: SeriesRepository,
  ) {}

  async create(): Promise<void> {
    try {
      for (let i = 0; i < seriesData.length; i++) {
        const element = seriesData[i];
        const existing = await this.seriesRepository.findOne({
          where: { name: element.name, volume: element.volume },
        });

        if (!existing) {
          const series = this.seriesRepository.create(element);
          const results = await series.save();
          this.logger.log(`Series: ${results.name} - ${results.volume} - Created`);
        } else {
          this.logger.log(`Series: ${element.name} - ${element.volume} - Exists`);
        }
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }
}
