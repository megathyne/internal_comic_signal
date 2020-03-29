import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Agent } from 'http';
import * as https from 'https';
import { map, mapTo, flatMap } from 'rxjs/operators';
import * as cheerio from 'cheerio';

@Injectable()
export class CoverService {
  private logger = new Logger('CoverService');

  constructor(private httpService: HttpService) {}
  async getCoverSmall(issueNumber) {
    try {
      const response = await this.httpService
        .get('https://comics.org/issue/' + issueNumber)
        .toPromise();

      const $ = cheerio.load(response.data);
      const coverSmall = $('.coverImage > a > img').attr('src');

      const coverLargeUrl = $(
        '.issue_cover_links > .left > a:first-child',
      ).attr('href');

      return { coverSmall, coverLargeUrl };
    } catch (error) {
      this.logger.log('In the ERROR');
      this.logger.error(error);
    }
  }

  async getCoverLarge(coverLargeUrl) {
    const response = await this.httpService
      .get('https://comics.org' + coverLargeUrl)
      .toPromise();

    const $ = cheerio.load(response.data);
    const largeCover = $(`.cover_img`).attr('src');
    return largeCover;
  }
}
