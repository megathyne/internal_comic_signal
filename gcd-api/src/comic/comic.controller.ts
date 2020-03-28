//GetByID
//Search

import { Logger, Get, Param, Controller, Query } from "@nestjs/common";
import { ComicService } from "./comic.service";
import { ComicDto } from "./dto/comic.dto";

@Controller('comic')
export class ComicController {
    private logger = new Logger('ComicController');

    constructor(private readonly comicService: ComicService){}

    @Get()
    get(@Query() data: any){
        this.logger.log(`Searching for ${JSON.stringify(data)}`);
        return this.comicService.getComicsBySeries(data.series,data.issue);
    }
    @Get('/:id')
    getComicByIssueId(@Param('id') id: string): Promise<ComicDto> {
        return this.comicService.getComicByIssueId(parseInt(id));
    }

}