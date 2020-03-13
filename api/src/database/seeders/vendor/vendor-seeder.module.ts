import { Module, Logger } from '@nestjs/common';
import { VendorModule } from 'src/vendor/vendor.module';
import { AuthModule } from 'src/auth/auth.module';
import { VendorSeederService } from './vendor-seeder.service';

@Module({
  imports: [VendorModule, AuthModule, Logger],
  providers: [VendorSeederService],
  exports: [VendorSeederService],
})
export class VendorSeederModule {}
