import { Controller, Logger, Get, Param } from '@nestjs/common';
import { CoverService } from './cover.service';

@Controller('cover')
export class CoverController {
  private logger = new Logger('CoverController');

  constructor(private readonly coverService: CoverService) {}

  @Get('/:id')
  getCoverByIssueId(@Param('id') id: string): Promise<any> {
    const issueId = parseInt(id);
    return this.coverService.coverImageSmall(issueId);
  }
}
