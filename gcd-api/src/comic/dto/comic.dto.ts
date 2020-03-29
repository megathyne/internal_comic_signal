import { CoverSmallDto } from 'src/cover/dto/cover-small.dto';

export class ComicDto {
  seriesId: number;

  issueId: number;

  seriesName: string;

  issueNumber: string;

  coverSmall: CoverSmallDto;
}
