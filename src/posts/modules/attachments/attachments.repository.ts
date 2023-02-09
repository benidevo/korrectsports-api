import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentsRepository extends Repository<Attachment> {
  constructor(private dataSource: DataSource) {
    super(Attachment, dataSource.createEntityManager());
  }

  async findById(id: string) {
    const attachment = await this.findOne({ where: { id } });
    return attachment;
  }
}
