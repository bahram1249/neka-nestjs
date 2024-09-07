import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Matches('^(\\w|[0-9])+$')
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches('^[a-zA-Z0-9!@#$%^&*]+$')
  password: string;
}
