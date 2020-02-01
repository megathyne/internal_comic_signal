import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Logger,
  Get,
  Body,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';

@ApiUseTags('vendor')
@ApiBearerAuth()
@Controller('vendor')
@UseGuards(AuthGuard('jwt'))
export class VendorController {
  private logger = new Logger('VendorController');

  constructor(private readonly vendorService: VendorService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  get(@GetUser() user: User): Promise<Vendor[]> {
    this.logger.verbose(`User "${user.username}" retrieving all comics.`);
    return this.vendorService.getVendor(user);
  }

  @Post()
  post(@GetUser() user: User, @Body() createVendorDto: CreateVendorDto): Promise<Vendor> {
    this.logger.verbose(`Creating vendor for UserId: ${user.id}. DTO: ${JSON.stringify(createVendorDto)}`);
    return this.vendorService.postVendor(createVendorDto, user);
  }
}
