import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import StorageProvider from './providers/storage.provider';

@Injectable()
export class SharedService {
  constructor(private storageProvider: StorageProvider) {}

  async uploadFile(file: Express.Multer.File) {
    const file_url = await this.storageProvider.saveFile(file);
    return file_url;
  }
}
