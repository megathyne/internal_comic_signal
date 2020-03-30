import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Agent } from 'http';
import * as https from 'https';
import { map, mapTo, flatMap } from 'rxjs/operators';
import * as cheerio from 'cheerio';
import { CoverDto } from './dto/cover-small.dto';

@Injectable()
export class CoverService {
  private logger = new Logger('CoverService');

  constructor(private httpService: HttpService) {}

  async coverImageSmall(issueNumber: number): Promise<CoverDto> {
    try {
      const response = await this.httpService
        .get('https://comics.org/issue/' + issueNumber)
        .toPromise();

      const $ = cheerio.load(response.data);

      const coverImageSmallUrl: string = $('.coverImage > a > img')
        .attr('src')
        .split('?')[0];

      const coverLargeUrl = $(
        '.issue_cover_links > .left > a:first-child',
      ).attr('href');

      const imageResponse = await this.httpService
        .get(coverImageSmallUrl, {
          responseType: 'arraybuffer',
        })
        .toPromise();

      let image = Buffer.from(imageResponse.data, 'binary').toString('base64');

      const result: CoverDto = {
        issueNumber,
        small: image,
        coverLargeUrl,
      };

      return result;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getCoverImageLargeUrl(coverLargeUrl): Promise<string> {
    try {
      const response = await this.httpService
        .get('https://comics.org' + coverLargeUrl)
        .toPromise();

      const $ = cheerio.load(response.data);
      const largeCover = $(`.cover_img`).attr('src');
      return largeCover;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
