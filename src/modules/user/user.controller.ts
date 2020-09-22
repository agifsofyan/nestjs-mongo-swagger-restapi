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
import { 
	ApiTags, 
	ApiOperation, 
	ApiHeader, 
	ApiQuery, 
	ApiProperty 
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

import { UserService } from './user.service';
import { RefreshAccessTokenDTO } from '../auth/dto/refresh-access-token.dto';

import { 
	CreateUserDTO, 
	UpdateUserDTO, 
	DeleteManyDTO,
	SearchDTO
} from './dto/user.dto';

var inRole = ["SUPERADMIN", "IT"];

@ApiTags('Users - [SUPERADMIN]')
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
    
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Add new administrator' })

	@ApiHeader({
        	name: 'x-auth-token',
        	description: 'token.'
    })

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
	
	@Roles(...inRole)
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

	@Roles(...inRole)
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
	
	@Roles(...inRole)
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
	
	@Roles(...inRole)
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
	 * @route   Delete /api/v1/users/delete/multiple
	 * @desc    Delete user/administrator by multiple ID
	 * @access  Public
	 **/

	@Delete('delete/multiple')

	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Delete multiple user/administrator' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async deleteMany(@Res() res, @Body() arrayId: DeleteManyDTO) {
		//console.log(arrayId)
		const user = await this.userService.deleteMany(arrayId);
		if (user == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove user/administrator by id in: [${arrayId.id}]`
			});
		}
	}

	/**
	 * @route   Post /api/v1/users/find/search
	 * @desc    Search user/administrator by name or email
	 * @access  Public
	 **/

	@Post('find/search')

	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Search and show' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token'
	})

	// @ApiQuery({
	// 	name: 'search',
	// 	required: false,
	// 	explode: true,
	// 	type: String,
	// 	isArray: false
	// })

	// @ApiBody({
	// 	required: false,
	// 	description: 'search anything name',
	// 	type: Object,
	// 	isArray: false
	// })

	async search(@Res() res, @Body() search: SearchDTO) {
		// console.log(search)
		const result = await this.userService.search(search);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success search user/administrator`,
			total: result.length,
			data: result
		});
	}
}
