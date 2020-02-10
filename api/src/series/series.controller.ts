import { ApiUseTags, ApiBearerAuth, ApiImplicitQuery } from "@nestjs/swagger";
import { Controller, UseGuards, Logger, Get, UseInterceptors, ClassSerializerInterceptor, Query } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SeriesService } from "./series.service";
import { GetSeriesFilterDto } from "./dto/get-series-filter.dto";
import { User } from "../auth/user.entity";
import { GetUser } from "../auth/get-user.decorator";
import { Series } from "./series.entity";



@ApiUseTags('series')
@ApiBearerAuth()
@Controller('series')
@UseGuards(AuthGuard('jwt'))
export class SeriesController {
  private logger = new Logger('SeriesController');

  constructor(private readonly seriesService: SeriesService){}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitQuery({name: 'search', type: String, required: false})
  get(@Query() filterDto:GetSeriesFilterDto, @GetUser() user:User): Promise<Series[]>{
    this.logger.verbose(`User "${user.username}" retrieving all comics. Filters: ${JSON.stringify(filterDto)}`)
    return  this.seriesService.getSeries(filterDto);
  }
}