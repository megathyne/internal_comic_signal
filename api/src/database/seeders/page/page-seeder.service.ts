import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageRepository } from 'src/page/page.repository';
import { pageData } from './page-data';

@Injectable()
export class PageSeederService {
  private logger = new Logger('PageSeederService');

  constructor(
    @InjectRepository(PageRepository)
    private pageRepository: PageRepository,
  ) {}

  async create(): Promise<void> {
    try {
      for (let i = 0; i < pageData.length; i++) {
        const element = pageData[i];
        const existing = await this.pageRepository.findOne({
          where: { code: element.code },
        });

        if (!existing) {
          const page = this.pageRepository.create(element);
          const results = await page.save();
          this.logger.log(`Condition: ${results.code} - Created`);
        } else {
          this.logger.log(`Condition: ${element.code} - Exists`);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
