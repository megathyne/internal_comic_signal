import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Logger, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConditionService } from './condition.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Condition } from './condition.entity';

@ApiUseTags('condition')
@ApiBearerAuth()
@Controller('condition')
@UseGuards(AuthGuard('jwt'))
export class ConditionController {
  private logger = new Logger('ConditionController');

  constructor(private readonly conditionService: ConditionService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  get(@GetUser() user: User): Promise<Condition[]> {
    this.logger.verbose(`User "${user.username}" retrieving all conditions.`);
    return this.conditionService.getCondition();
  }
}
