import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IssueRepository } from "./issue.repository";
import { ComicService } from "./comic.service";
import { ComicController } from "./comic.controller";

@Module({
    imports: [TypeOrmModule.forFeature([IssueRepository])],
    providers: [ComicService],
    controllers: [ComicController],
    exports: [ComicService],
})
export class ComicModule{}