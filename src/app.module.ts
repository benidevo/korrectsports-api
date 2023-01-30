import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormModule as DbConfigModule } from './typeorm/typeorm.module';
import { TypeOrmOptions } from './typeorm/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbConfigModule,
    TypeOrmModule.forRoot(TypeOrmOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
