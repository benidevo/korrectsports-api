import { IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsUrl()
  banner: string;

  @IsUrl()
  @IsOptional()
  videoLink?: string;

  @IsString()
  description: string;

  @IsUUID()
  categoryId: string;
}
