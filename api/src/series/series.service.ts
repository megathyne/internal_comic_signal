import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeriesRepository } from './series.repository';
import { GetSeriesFilterDto } from './dto/get-series-filter.dto';
import { Series } from './series.entity';

@Injectable()
export class SeriesService {
  private logger = new Logger('SeriesService');

  constructor(@InjectRepository(SeriesRepository) private seriesRepository: SeriesRepository) {}

  async getSeries(filterDto: GetSeriesFilterDto): Promise<Series[]> {
    return await this.seriesRepository.getSeries(filterDto);
  }

  async getSeriesById(id: number): Promise<Series> {
    return await this.seriesRepository.findOne(id);
  }
}
