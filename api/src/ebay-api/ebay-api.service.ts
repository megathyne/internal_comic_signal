import { Injectable, Logger, HttpService } from '@nestjs/common';
import { GetEbayItemFilterDto } from './dto/get-ebay-item-filter.dto';
import { GetEbayItemResponseDto } from './dto/get-ebay-item-response.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class EbayApiService {
  private logger = new Logger('EbayApiService');

  constructor(private readonly httpService: HttpService) { }

  async get(getEbayItemFilterDto: GetEbayItemFilterDto, user: User): Promise<GetEbayItemResponseDto[]> {
    this.logger.log(`Fetching ebay items for UserId: ${user.id}. Filter Dto: ${getEbayItemFilterDto}`);
    try {
      const response = await this.httpService
        .get(`http://${process.env.EBAY_API_URL}:${process.env.EBAY_API_PORT}/ebay-item`, {
          params: getEbayItemFilterDto,
        })
        .toPromise();
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async  getByIds(ids: string[], user: User): Promise<GetEbayItemResponseDto[]> {
    this.logger.log(`Fetching ebay items by ids for UserId: ${user.id}. Ids ${ids}`)
    try {
      const response = await this.httpService
        .get(`http://${process.env.EBAY_API_URL}:${process.env.EBAY_API_PORT}/ebay-item/ids`, {
          params: ids
        })
        .toPromise()
      return response.data

    } catch (error) {
      this.logger.error(error)
    }
  }
}

