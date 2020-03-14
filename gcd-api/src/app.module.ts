import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { ComicController } from './comic/comic.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
  ],
  controllers: [
    AppController,
    ComicController
  ],
  providers: [AppService],
})
export class AppModule {}
