import { Injectable, Logger, HttpService } from '@nestjs/common';
import { FindCompletedItemsResponse } from '../finding/dto/findCompletedItemsResponse.dto';

@Injectable()
export class SellingService {
    private logger = new Logger('SellingService');

    constructor(private readonly httpService: HttpService){}

    async apiLogin(): Promise<any>{}

    async apiListingItem(): Promise<any> {
        const url = '';
        const params = {

        };
        try {
            const response = await this.httpService.get(url, {params}).toPromise();
            return response.data;
        } catch (error) {
            this.logger.error(`Error making api request to list an item. Params: ${params}`, error);
        }
    }
}