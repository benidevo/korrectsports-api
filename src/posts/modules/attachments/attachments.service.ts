import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from 'src/posts/posts.repository';
import { AttachmentsRepository } from './attachments.repository';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(
    private readonly attachmentRepository: AttachmentsRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  async create(createAttachmentDto: CreateAttachmentDto, postId: string) {
    const post = await this.postRepository.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const attachment = this.attachmentRepository.create({
      ...createAttachmentDto,
      post,
    });
    await this.attachmentRepository.save(attachment);
    return attachment;
  }

  async findAll() {
    const attachments = await this.attachmentRepository.find();
    return attachments;
  }

  async findOne(id: string) {
    const attachment = await this.attachmentRepository.findById(id);
    if (!attachment) throw new NotFoundException('Attachment not found');
    return attachment;
  }

  async update(id: string, updateAttachmentDto: UpdateAttachmentDto) {
    await this.attachmentRepository.update(id, updateAttachmentDto);
  }

  async remove(id: string) {
    await this.attachmentRepository.delete(id);
  }
}
