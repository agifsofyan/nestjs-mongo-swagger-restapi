import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MulterModule.register({
    dest: './storage/images',
  }),
    AuthModule,
  ],
  controllers: [MediaController]
})
export class MediaModule {}
