import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Logger, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { PortfolioService } from './portfolio.service';

@ApiUseTags('portfolio')
@ApiBearerAuth()
@Controller('portfolio')
@UseGuards(AuthGuard('jwt'))
export class PortfolioController {
  private logger = new Logger('PortfolioController');

  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getPortfolio(@GetUser() user: User) {
    this.logger.log(`User "${user.username}" retrieving portfolio.`);
    return this.portfolioService.get(user);
  }

  @Get(':id')
  getPortfolioById(@Param('id') inventoryId, @GetUser() user: User) {
    this.logger.log(`User "${user.username}" retrieving portfolio id: ${inventoryId}`);
    return this.portfolioService.getPortfolioItem(inventoryId, user);
  }
}
