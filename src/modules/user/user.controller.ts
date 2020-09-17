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
import { ApiTags, ApiOperation, ApiHeader, ApiQuery, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
//import { JwtAuthGuard } from '../auth/guards/jwt.guard';

import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { RefreshAccessTokenDTO } from '../auth/dto/refresh-access-token.dto';

var role: string = "SUPERADMIN";

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
    @Post()
    
	// @Roles(role)
	//@UseGuards(JwtAuthGuard, RolesGuard)
	// @UseGuards(AuthGuard('jwt'))

	// @ApiOperation({ summary: 'Add new administrator' })

	// @ApiHeader({
 //        	name: 'x-auth-token',
 //        	description: 'token.'
 //    })

	/**
	 * @route   Post /api/v1/users/:id
	 * @desc    Create new Administrator
	 * @access  Public
	 **/

    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.create(createUserDTO);
        return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'Aministrator created successfully.',
			data: user
		});
	}
	
	/**
	 * @route   Put /api/v1/users/:id
	 * @desc    Update user by Id
	 * @access  Public
	 **/

	@Put(':id')
	
	@Roles(role)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Update User/Administrator by id' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async update(
		@Param('id') id: string,
		@Res() res,
		@Body() updateUserDto: UpdateUserDTO
	) {
		const user = await this.userService.update(id, updateUserDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The User/Administrator has been successfully updated.',
			data: user
		});
	}

	/**
	 * @route   Get /api/v1/users
	 * @desc    Get all administrator
	 * @access  Public
	 **/

	@Get()

	@Roles(role)
	@UseGuards(AuthGuard('jwt'))

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

	/**
	 * @route   Delete /api/v1/users/:id
	 * @desc    Delete user/aadministrator by ID
	 * @access  Public
	 **/
	 
	@Delete(':id')
	
	@Roles(role)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Delete user/administrator' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async delete(@Param('id') id: string, @Res() res){
		const user = await this.userService.delete(id);
		
		if (user == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove user/administrator by id ${id}`
			});
		}
	}

	/**
	 * @route   Get /api/v1/users/find
	 * @desc    Search user by name
	 * @access  Public
	 **/

	@Get('find')
	
	@Roles(role)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Search and show' })

	@ApiHeader({
	 	name: 'x-auth-token',
	 	description: 'token'
	})

	// @ApiQuery({
	// 	name: 'search anything name',
	// 	required: false,
	// 	explode: true,
	// 	type: String,
	// 	isArray: false
	// })

	@ApiBody({
		required: false,
		description: 'search anything name',
		type: Object,
		isArray: false
	})

	async search(@Res() res, @Body() search: any) {
		const user = await this.userService.search(search);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success search user`,
			total: user.length,
			data: user
		});
	}
}
