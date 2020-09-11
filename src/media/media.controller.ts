import {
    Controller,
    Get,
    Post,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    Res,
    Param,
} from '@nestjs/common';
  
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { editFileName, imageFileFilter } from './helper/file-upload.helper';
  
@Controller('uploads')
export class MediaController {
    
    @Post()
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './storage/images',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
            path: 'storage/images'
        };

        console.log('exception', response)

        return response;
    }
  
    @Post('multiple')
    @UseInterceptors(
      FilesInterceptor('image', 20, {
        storage: diskStorage({
          destination: './storage/images',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
      const response = [];
      files.forEach(file => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
      return response;
    }
  
    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './storage/images' });
    }
}
  