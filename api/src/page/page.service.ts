import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageRepository } from './page.repository';
import { Page } from './page.entity';

@Injectable()
export class PageService {
  private logger = new Logger('PageService');

  constructor(@InjectRepository(PageRepository) private pageRepository: PageRepository) {}

  async getPage(): Promise<Page[]> {
    return await this.pageRepository.find();
  }
}
