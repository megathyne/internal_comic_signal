import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Agent } from 'http';
import * as https from 'https';
import { map, mapTo } from 'rxjs/operators';
import { cheerio } from 'cheerio';

@Injectable()
export class CoverService {
  private logger = new Logger('CoverService');

  constructor(private httpService: HttpService) {}
  async getCover(issueNumber) {
    try {

      return await this.httpService
        .get('https://comics.org/issue/' + issueNumber, )
        .pipe(map(html => cheerio.load(html)))
        .subscribe($ => {
            console.log($)
        })
      
    } catch (error) {
      this.logger.log('In the ERROR');
      this.logger.error(error);
    }

    
  }
}
