import { 
	Controller, 
	Get, 
	Res, 
	HttpStatus, 
	Req,
	Param, 
	Body, 
	Post,
	Put, 
	Delete,
	UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { XenditService } from './xendit.service';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery, ApiBody, ApiProperty } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

// var inRole = ["SUPERADMIN", "IT", "ADMIN"];

//@ApiTags('Xenditss - [SUPERADMIN & ADMIN]')
//@UseGuards(RolesGuard)
@Controller('xendits')
export class XenditController {
    constructor(private readonly xenditService: XenditService) { }
    
    @Get()
	
	// @Roles(...inRole)
	// @UseGuards(AuthGuard('jwt'))

	//@ApiOperation({ summary: 'Test Xendit' })
	// @ApiHeader({
	// 	name: 'x-auth-token',
	// 	description: 'token.'
	// })

	async findAll(@Req() req, @Res() res) {
        const topic = await this.xenditService.findAll();
        
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get xendit`,
			total: topic.length,
			data: topic
		});
	}
}
