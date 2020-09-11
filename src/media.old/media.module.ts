import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

import { MulterModule } from '@nestjs/platform-express';

import {FactoryProvider} from "@nestjs/common/interfaces";
import {TYPE_STORAGE_IMAGE} from "../config/multer.configuration";
import {StorageFactory} from "./cloud/storage.factory";

// export const CropMulterFactory: FactoryProvider = {
//   provide: 'IUploadImage',
//   useFactory: () => {
//     return StorageFactory.createStorageFromType(TYPE_STORAGE_IMAGE);
//   },
// };

@Module({
  imports: [MulterModule.register({
    dest: './files',
  })],
  // providers: [MediaService, CropMulterFactory],
  controllers: [MediaController]
})
export class MediaModule {}
