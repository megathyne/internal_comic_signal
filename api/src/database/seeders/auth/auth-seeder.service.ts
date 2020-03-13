import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { authData } from './auth-data';

@Injectable()
export class AuthSeederService {
  private logger = new Logger(`AuthSeederService`);

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(): Promise<void> {
    try {
      for (let i = 0; i < authData.length; i++) {
        const element = authData[i];
        const existing = await this.userRepository.findOne({
          where: { username: element.username },
        });

        if (!existing) {
          await this.userRepository.signUp(element);
          this.logger.log(`User: ${element.username} - ${element.password} - Created`);
        } else {
          this.logger.log(`User: ${element.username} - ${element.password} - Exists`);
        }
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }
}
