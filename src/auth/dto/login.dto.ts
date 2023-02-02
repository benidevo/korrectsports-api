import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(8)
  @IsString()
  password: string;
}
