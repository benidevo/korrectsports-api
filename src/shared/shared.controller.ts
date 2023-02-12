import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Express } from 'express';
import { SharedService } from './shared.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JWTAuthGuard } from '../auth/jwt-auth-guard';

@Controller('shared')
@UseGuards(JWTAuthGuard)
export class SharedController {
  constructor(private readonly sharedService: SharedService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(png|jpe?g)$/,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return { fileUrl: await this.sharedService.uploadFile(file) };
  }
}
