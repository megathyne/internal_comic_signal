import { Module, Logger } from '@nestjs/common';
import { PageModule } from 'src/page/page.module';
import { PageSeederService } from './page-seeder.service';

@Module({
  imports: [PageModule, Logger],
  providers: [PageSeederService],
  exports: [PageSeederService],
})
export class PageSeederModule {}
