import { Controller, UseGuards, Logger, Get } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AnalyticsService } from './analytics.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@ApiUseTags('analytics')
@ApiBearerAuth()
@Controller('analytics')
@UseGuards(AuthGuard('jwt'))
export class AnalyticsController {
  private logger = new Logger('AnalyticsController');

  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('costs')
  getTotalCosts(@GetUser() user: User): Promise<Number> {
    this.logger.verbose(`User "${user.username}" retrieving costs of inventory`);
    return this.analyticsService.getTotalCosts(user);
  }

  @Get('value')
  get(@GetUser() user: User): Promise<Number> {
    this.logger.verbose(`User "${user.username}" retrieving value of inventory`);
    return this.analyticsService.getTotalValue(user);
  }
}
