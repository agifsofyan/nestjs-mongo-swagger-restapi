import { 
    Controller,
    Inject,
    Query,
	Res, 
	HttpStatus, 
	Req,
	Post,
	UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';
import {IUploadImage} from "./interface/upload.image.interface";
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import {CropDto} from "./dto/crop.dto";
import * as  uuid from 'uuid';

@ApiTags('Media')
@UseGuards(RolesGuard)
@Controller('media')
export class MediaController {
    constructor(
        @Inject('IUploadImage')
        private readonly uploadImage: IUploadImage,
    ) {}
    
    /**
	 * @route   POST /api/v1/media/images
	 * @desc    Create a new product
	 * @access  Public
	 */
	@Post()
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Upload Image' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
    })
    
    @Post('/images')
    async create(
        @Query() cropDto: CropDto,
        @Req() req,
        @Res() res,
    ) {
        await new Promise((resolve, reject) => {
            this.uploadImage
                .setFilename(uuid())
                .setCroppedPrefix('__cropped__')
                .setCroppedPayload(cropDto)
                .getMulter()(req, res, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(req.file);
                });
        });

        res.code(200).send(true);

        // return res.status(HttpStatus.OK).json({
		// 	statusCode: HttpStatus.OK,
		// 	message: `Success upload image`,
		// 	data: image
		// });
        return ;
    }
}
