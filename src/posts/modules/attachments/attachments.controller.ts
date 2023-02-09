import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from '../../../auth/jwt-auth-guard';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@Controller('posts/:postId/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  create(
    @Body() createAttachmentDto: CreateAttachmentDto,
    @Param('postId') postId: string,
  ) {
    return this.attachmentsService.create(createAttachmentDto, postId);
  }

  @Get()
  findAll() {
    return this.attachmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachmentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAttachmentDto: UpdateAttachmentDto,
  ) {
    return this.attachmentsService.update(id, updateAttachmentDto);
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: string) {
    return this.attachmentsService.remove(id);
  }
}
