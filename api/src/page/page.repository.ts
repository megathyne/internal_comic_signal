import { EntityRepository, Repository } from 'typeorm';
import { Page } from './page.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {
  private logger = new Logger('PageRepository');
}
