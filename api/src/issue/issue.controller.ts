import {
  Controller,
  UseGuards,
  Logger,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  Param,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiImplicitQuery, ApiImplicitParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IssueService } from './issue.service';
import { GetIssueFilterDto } from './dto/get-issue-filter.dto';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { Issue } from './issue.entity';
import { GetSeriesByIssueIdDto } from './dto/get-issue-by-series-id.dto';

@ApiUseTags('issue')
@ApiBearerAuth()
@Controller('issue')
@UseGuards(AuthGuard('jwt'))
export class IssueController {
  private logger = new Logger('IssueController');

  constructor(private readonly issueService: IssueService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitQuery({ name: 'search', type: String, required: false })
  get(@Query() filterDto: GetIssueFilterDto, @GetUser() user: User): Promise<Issue[]> {
    this.logger.verbose(`User "${user.username}" retrieving all issues.  Filters: ${JSON.stringify(filterDto)}`);
    return this.issueService.getIssue(filterDto);
  }

  @Get('/:seriesId')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitParam({ name: 'seriesId', type: Number, required: true })
  getBySeries(@Param() getSeriesByIssueIdDto: GetSeriesByIssueIdDto, @GetUser() user: User): Promise<Issue[]> {
    this.logger.verbose(`User "${user.username}" retrieving issues by SeriesId: ${JSON.stringify(getSeriesByIssueIdDto)}.`);
    return this.issueService.getIssuesBySeries(getSeriesByIssueIdDto);
  }
}
