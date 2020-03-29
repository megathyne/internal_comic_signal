import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { ComicModule } from './comic/comic.module';
import { CoverModule } from './cover/cover.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ComicModule, CoverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
