import { 
    UseGuards,
    Controller,
    Get,
    Res,
    Req,
    Post,
    Body,
    HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLoginDTO } from './dto/login.dto';
import { RefreshAccessTokenDTO } from '../auth/dto/refresh-access-token.dto';

var roles: "ADMIN";

@ApiTags('Users')
@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
	 * @route   POST /api/v1/users
	 * @desc    Create a new user
	 * @access  Public
	 */
    @Post('add')
    @UseGuards(AuthGuard('jwt'))
	@Roles(roles)
	@ApiOperation({ summary: 'Add new administrator' })
	@ApiHeader({
        	name: 'x-auth-token',
        	description: 'token.'
    })
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.create(createUserDTO);
        return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'Aministrator created successfully.',
			data: user
		});
    }

    /**
     * @route   POST api/v1/users/login
     * @desc    Authenticate user
     * @access  Public
     */
    @Post('login')
    @ApiOperation({ summary: 'Aministrator Login' })
    async login(@Req() req: Request, @Body() userLoginDTO: UserLoginDTO) {
        return await this.userService.login(req, userLoginDTO);
    }

    /**
     * @route   POST api/v1/users/refresh-access-token
     * @desc    Refresh user access token
     * @access  Public
     */
    @Post('refresh-access-token')
    @ApiOperation({ summary: 'Refresh Access Token' })
    async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDTO) {
        return await this.userService.refreshAccessToken(refreshAccessTokenDto);
    }

    /**
	 * @route   GET /api/v1/users/all
	 * @desc    Get all user
	 * @access  Public
	 */
	@Get('all')
	@UseGuards(AuthGuard('jwt'))
	@Roles(roles)
	@ApiOperation({ summary: 'Get all user' })

	// Swagger Header [required]
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token'
	})

	// Swagger Parameter [optional]
	@ApiQuery({
		name: 'sortval',
		required: false,
		explode: true,
		type: String,
		isArray: false
	})

	@ApiQuery({
		name: 'sortby',
		required: false,
		explode: true,
		type: String,
		isArray: false
	})

	@ApiQuery({
		name: 'value',
		required: false,
		explode: true,
		type: String,
		isArray: false
	})

	@ApiQuery({
		name: 'fields',
		required: false,
		explode: true,
		type: String,
		isArray: false
	})

	@ApiQuery({
		name: 'limit',
		required: false,
		explode: true,
		type: Number,
		isArray: false
	})

	@ApiQuery({ 
		name: 'offset', 
		required: false, 
		explode: true, 
		type: Number, 
		isArray: false 
	})

	async findAll(@Req() req, @Res() res) {
		const user = await this.userService.findAll(req.query);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get users`,
			data: user
		});
	}
}
