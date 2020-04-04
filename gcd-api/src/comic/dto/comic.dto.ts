import { CoverDto } from 'src/cover/dto/cover-small.dto';

export class ComicDto {
  seriesId: number;

  issueId: number;

  seriesName: string;

  yearBegan: string;

  issueNumber: string;

  coverSmall: CoverDto; 
}
