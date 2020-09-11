import {
    Controller,
    Get,
    Post,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    Res,
    Param,
} from '@nestjs/common';
  
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

import { editFileName, imageFileFilter } from './helper/file-upload.helper';

@ApiTags('Uploads')
@UseGuards(RolesGuard)
@Controller('uploads')
export class MediaController {
    
    /**
     * @route   POST /api/v1/uploads
     * @desc    Upload Image
     * @access  Public
     */
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @Roles('Administrator')
    @ApiOperation({ summary: 'Single Upload' })
    @ApiHeader({
      name: 'x-auth-token',
      description: 'token.'
    })
  
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
    /**
	 * @route   POST /api/v1/uploads/multiple
	 * @desc    Multiple Image Upload
	 * @access  Public
	 */
    @UseGuards(AuthGuard('jwt'))
    @Roles('Administrator')
    @ApiOperation({ summary: 'Multiple Upload' })
    @ApiHeader({
      name: 'x-auth-token',
      description: 'token.'
    })
  
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
    
    /**
	 * @route   POST /api/v1/uploads/:new name of image
	 * @desc    Get Image [:imgpath]
	 * @access  Public
	 */
    @UseGuards(AuthGuard('jwt'))
    @Roles('Administrator')
    @ApiOperation({ summary: 'Get Image' })
    @ApiHeader({
      name: 'x-auth-token',
      description: 'token.'
    })
    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './storage/images' });
    }
}
  