import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Logger, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PageService } from './page.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Page } from './page.entity';

@ApiUseTags('page')
@ApiBearerAuth()
@Controller('page')
@UseGuards(AuthGuard('jwt'))
export class PageController {
  private logger = new Logger('GradeController');

  constructor(private readonly pageService: PageService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  get(@GetUser() user: User): Promise<Page[]> {
    this.logger.verbose(`User "${user.username}" retrieving all pages.`);
    return this.pageService.getPage();
  }
}
