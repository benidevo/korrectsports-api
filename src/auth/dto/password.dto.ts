import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @MinLength(6)
  @MaxLength(8)
  @IsString()
  oldPassword: string;

  @MinLength(6)
  @MaxLength(8)
  @IsString()
  newPassword: string;
}
