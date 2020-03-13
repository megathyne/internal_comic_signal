import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorRepository } from './vendor.repository';
import { Vendor } from './vendor.entity';
import { User } from '../auth/user.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Injectable()
export class VendorService {
  private logger = new Logger('VendorService');

  constructor(@InjectRepository(VendorRepository) private vendorRepository: VendorRepository) {}

  async getVendor(user: User): Promise<Vendor[]> {
    return await this.vendorRepository.find({ where: { user } });
  }

  async postVendor(createVendorDto: CreateVendorDto, user: User): Promise<Vendor> {
    return this.vendorRepository.createVendor(createVendorDto, user);
  }
}
