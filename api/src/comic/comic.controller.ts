import {
  Controller,
  UseGuards,
  Logger,
  Post,
  Body,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiImplicitQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ComicService } from './comic.service';
import { CreateComicDto } from './dto/create-comic.dto';
import { GetComicFilterDto } from './dto/get-comic-filter.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Comic } from './comic.entity';

@ApiUseTags('comic')
@ApiBearerAuth()
@Controller('comic')
@UseGuards(AuthGuard('jwt'))
export class ComicController {
  private logger = new Logger('ComicsController');

  constructor(private readonly comicService: ComicService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitQuery({ name: 'search', type: String, required: false })
  get(@Query() filterDto: GetComicFilterDto, @GetUser() user: User): Promise<Comic[]> {
    this.logger.verbose(`User "${user.username}" retrieving all comics. Filters: ${JSON.stringify(filterDto)}`);
    return this.comicService.getComic(filterDto);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getComicById(@Param('id') id: number, @GetUser() user: User): Promise<Comic> {
    return this.comicService.getComicById(id);
  }

  @Post()
  post(@Body() createComicDto: CreateComicDto): Promise<void> {
    return this.comicService.postComic(createComicDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.comicService.deleteComic(id);
  }
}
