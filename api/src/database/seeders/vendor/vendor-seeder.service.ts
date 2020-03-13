import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorRepository } from 'src/vendor/vendor.repository';
import { UserRepository } from 'src/auth/user.repository';
import { authData } from '../auth/auth-data';
import { vendorData } from './vendor-data';

@Injectable()
export class VendorSeederService {
  private logger = new Logger(`VendorSeederService`);

  constructor(
    @InjectRepository(VendorRepository)
    private vendorRepository: VendorRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(): Promise<void> {
    try {
      for (let i = 0; i < authData.length; i++) {
        const elementAuth = authData[i];
        const user = await this.userRepository.findOne({
          where: {
            username: elementAuth.username,
          },
        });

        for (let k = 0; k < vendorData.length; k++) {
          const elementVendor = vendorData[k];
          const exists = await this.vendorRepository.findOne({
            where: {
              name: elementVendor.name,
              subvendor: elementVendor.subvendor,
              user,
            },
          });

          if (!exists) {
            const vendor = this.vendorRepository.create({ ...elementVendor, user });
            const results = await vendor.save();
            this.logger.log(`Vendor ${results.name} - ${results.subvendor} - Created`);
          } else {
            this.logger.log(`Vendor ${elementVendor.name} - ${elementVendor.subvendor} - Exists`);
          }
        }
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }
}
