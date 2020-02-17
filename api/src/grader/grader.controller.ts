import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Logger, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GraderService } from './grader.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Grader } from './grader.entity';

@ApiUseTags('grader')
@ApiBearerAuth()
@Controller('grader')
@UseGuards(AuthGuard('jwt'))
export class GraderController {
  private logger = new Logger('GradeController');

  constructor(private readonly graderService: GraderService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  get(@GetUser() user: User): Promise<Grader[]> {
    this.logger.verbose(`User "${user.username}" retrieving all graders.`);
    return this.graderService.getGrader();
  }
}
