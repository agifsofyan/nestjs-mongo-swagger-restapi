import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './storage/images',
  })],
  controllers: [MediaController]
})
export class MediaModule {}
