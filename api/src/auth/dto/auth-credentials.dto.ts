import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiModelProperty({example: 'megathyne'})
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiModelProperty({example: 'Password1'})
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;
}
