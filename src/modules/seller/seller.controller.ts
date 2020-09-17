import { 
    UseGuards,
    Controller,
    Get,
    Res,
    Req,
	Post,
	Put,
	Delete,
	Body,
	Param,
    HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from '../user/user.service';

var role: string = "ADMIN";

@ApiTags('Sellers')
@UseGuards(RolesGuard)
@Controller('sellers')
export class SellerController {
    constructor(private readonly userService: UserService) {}

	@Get()

	@Roles(role)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Get all user' })

	// Swagger Header [required]
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token'
	})
	
	async findAll(@Req() req, @Res() res) {
		const user = await this.userService.findAll(req.query);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get users`,
			total: user.length,
			data: user
		});
	}

	/**
	 * @route    Get /api/v1/users/:id
	 * @desc     Get user/administrator by ID
	 * @access   Public
	 */

	@Get(':id')
	
	@Roles(role)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Get user by id' })

	@ApiHeader({
		name: 'x-auth-token',
	 	description: 'token'
	})
	async findById(@Param('id') id: string, @Res() res)  {
		const user = await this.userService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get user by id ${id}`,
			data: user
		});
	}
}
