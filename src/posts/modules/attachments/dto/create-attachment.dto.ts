import { IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class CreateAttachmentDto {
  @IsBoolean()
  @IsOptional()
  isVideo?: boolean;

  @IsUrl()
  value: string;
}
