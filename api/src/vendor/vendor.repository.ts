import { EntityRepository, Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { Logger, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor> {
  private logger = new Logger('VendorRespository');

  async createVendor(createVendorDto: CreateVendorDto, user: User): Promise<Vendor> {
    const { name, subvendor } = createVendorDto;

    const vendor = this.create();
    vendor.name = name;
    vendor.subvendor = subvendor;
    vendor.user = user;

    try {
      const item = await vendor.save();
      delete item.user;
      return item;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate comic
        this.logger.error(
          `Failed to create a vendor for UserId: ${user.id}, Vendor already exists. Data: ${JSON.stringify(
            createVendorDto,
          )}`,
          error.stack,
        );
        throw new ConflictException('Vendor already exists');
      }

      this.logger.error(`Failed to create a vendor for UserId: ${user.id}. Data: ${createVendorDto}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
