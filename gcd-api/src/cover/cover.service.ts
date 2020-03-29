import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Agent } from 'http';
import * as https from 'https';
import { map, mapTo, flatMap } from 'rxjs/operators';
import * as cheerio from 'cheerio';
import { CoverSmallDto } from './dto/cover-small.dto';

@Injectable()
export class CoverService {
  private logger = new Logger('CoverService');

  constructor(private httpService: HttpService) {}

  async coverImageSmall(issueNumber: number): Promise<CoverSmallDto> {
    try {
      const response = await this.httpService
        .get('https://comics.org/issue/' + issueNumber)
        .toPromise();

      const $ = cheerio.load(response.data);
      const coverImageSmallUrl = $('.coverImage > a > img').attr('src');
      const coverLargeUrl = $(
        '.issue_cover_links > .left > a:first-child',
      ).attr('href');

      const result: CoverSmallDto = {
        issueNumber,
        coverImageSmallUrl,
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
