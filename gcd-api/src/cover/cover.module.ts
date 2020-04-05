import { Module, HttpModule } from '@nestjs/common';
import { CoverService } from './cover.service';
import { CoverController } from './cover.controller';

@Module({
  imports: [HttpModule],
  providers: [CoverService],
  controllers: [CoverController],
  exports: [CoverService],
})
export class CoverModule {}
