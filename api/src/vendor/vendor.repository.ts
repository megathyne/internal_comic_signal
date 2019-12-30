import { EntityRepository, Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor> {
  private logger = new Logger('VendorRespository');
}
