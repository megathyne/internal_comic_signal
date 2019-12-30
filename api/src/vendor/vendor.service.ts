import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorRepository } from './vendor.repository';
import { Vendor } from './vendor.entity';

@Injectable()
export class VendorService {
  private logger = new Logger('VendorService');

  constructor(@InjectRepository(VendorRepository) private vendorRepository: VendorRepository) {}

  async getVendor(): Promise<Vendor[]> {
    return await this.vendorRepository.find();
  }
}
