import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';
import StorageProvider from './providers/storage.provider';

@Module({
  imports: [],
  controllers: [SharedController],
  providers: [SharedService, StorageProvider],
})
export class SharedModule {}
