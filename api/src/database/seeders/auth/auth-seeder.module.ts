import { Module, Logger } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthSeederService } from './auth-seeder.service';

@Module({
  imports: [AuthModule, Logger],
  providers: [AuthSeederService],
  exports: [AuthSeederService],
})
export class AuthSeederModule {}
