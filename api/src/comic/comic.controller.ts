import { ApiUseTags, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, UseGuards, Logger, Get, Param, Query } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AuthGuard } from "@nestjs/passport";
import { ComicService } from "./comic.service";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { GetGcdItemResponseDto } from "src/gcd-api/dto/get-gcd-item-response.dto";
import { GetEbayItemFilterDto } from "src/ebay-api/dto/get-ebay-item-filter.dto";

@ApiUseTags('comic')
@ApiBearerAuth()
@Controller('comic')
@UseGuards(AuthGuard('jwt'))
export class ComicController {
    private logger = new Logger('ComicController');

    constructor(private readonly comicService: ComicService) {}

    @Get()
    get(@Query('comicSeries')comicSeries: string, @Query('issueNumber')issueNumber: number,@GetUser() user: User): Promise<GetGcdItemResponseDto[]>{
        
        const comicSearchDto = new GetEbayItemFilterDto;
        comicSearchDto.series = comicSeries;
        comicSearchDto.issue = issueNumber;

        this.logger.log(`IN COMIC CONTROLLER SEARCHING FOR: ${comicSeries}`);
        return this.comicService.getComicResults(comicSearchDto, user);
    }
}