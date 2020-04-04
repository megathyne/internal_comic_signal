import { Injectable, Logger, HttpService } from '@nestjs/common';
import { GetGcdItemFilterDto } from './dto/get-gcd-item-filter.dto';
import { User } from '../auth/user.entity';
import { GetGcdItemResponseDto } from './dto/get-gcd-item-response.dto';

@Injectable()
export class GcdApiService {
  private logger = new Logger('GcdApiService');

  constructor(private readonly httpService: HttpService) {}

  async get(getGcdItemFilterDto: GetGcdItemFilterDto, user: User): Promise<GetGcdItemResponseDto[]> {
    this.logger.log(`Fetching comics for UserId: ${user.id}.  Filter Dto: ${GetGcdItemFilterDto}`);
    try {
      const response = await this.httpService
        .get(`http://${process.env.GCD_API_URL}:${process.env.GCD_API_PORT}/comic`, { params: getGcdItemFilterDto })
        .toPromise();
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  } 

  async getById(id, user): Promise<any> {
    console.log(id);
    this.logger.log(`Fetching comic details for UserId: ${user.id}. ComicId: ${id}`);

    try {
      const response = await this.httpService
        .get(`http://${process.env.GCD_API_URL}:${process.env.GCD_API_PORT}/comic/${id}`)
        .toPromise();
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  } 

  async getCoverById(id, user): Promise<any> {
    this.logger.log(`Fetching cover details for UserId: ${user.id}. ComicId: ${id}`);

    try {
      const response = await this.httpService
        .get(`http://${process.env.GCD_API_URL}:${process.env.GCD_API_PORT}/cover/${id}`)
        .toPromise();
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
