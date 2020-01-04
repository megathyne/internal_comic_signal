import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Logger, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GradeService } from './grade.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Grade } from './grade.entity';

@ApiUseTags('grade')
@ApiBearerAuth()
@Controller('grade')
@UseGuards(AuthGuard('jwt'))
export class GradeController {
  private logger = new Logger('GradeController');

  constructor(private readonly gradeService: GradeService) {}

  @Get()
  get(@GetUser() user: User): Promise<Grade[]> {
    this.logger.verbose(`User "${user.username}" retrieving all grades.`);
    return this.gradeService.getGrade();
  }
}
