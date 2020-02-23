import { Injectable, Logger, HttpService } from '@nestjs/common';
//import { findCompletedItemsResponse } from './dto/findCompletedItemsResponse.dto';
//import { truncateSync } from 'fs';

@Injectable()
export class FindingService {
  private logger = new Logger('FindingService');

  constructor(private readonly httpService: HttpService) {}

  async getCompletedItems() {
    this.logger.log('In getCompletedItems');
    const URL = 'https://svcs.ebay.com/services/search/FindingService/v1';
    try {
      //   const response = await this.httpService.get(
      //     `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=ChrisJoh-CSignal-PRD-fca83364c-62f2e4a3&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD&keywords=spawn%20300&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true`,
      //   ).toPromise();

      const response = await this.httpService
        .get(URL, {
          params: {
            'OPERATION-NAME': 'findCompletedItems',
            'SERVICE-VERSION': '1.7.0',
            'SECURITY-APPNAME': process.env.EBAY_API_APPID,
            'RESPONSE-DATA-FORMAT': 'JSON',
            'REST-PAYLOAD': 'null',
            'keywords': 'spawn 300',
            'itemFilter(0).name': 'SoldItemsOnly',
            'itemFilter(0).value': 'true',
            //'paginationInput.pageNumber':pageNumber
          },
        })
        .toPromise();

      this.logger.log(response.data);
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
