import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Logger, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@ApiUseTags('vendor')
@ApiBearerAuth()
@Controller('vendor')
@UseGuards(AuthGuard('jwt'))
export class VendorController {
  private logger = new Logger('VendorController');

  constructor(private readonly vendorService: VendorService) {}

  @Get()
  get(@GetUser() user: User): Promise<Vendor[]> {
    this.logger.verbose(`User "${user.username}" retrieving all comics.`);
    return this.vendorService.getVendor();
  }
}
