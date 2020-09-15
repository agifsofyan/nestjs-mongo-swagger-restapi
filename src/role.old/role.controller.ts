import { 
	Controller, 
	Get, 
	Res, 
	HttpStatus, 
	Req,
	Param, 
	Body, 
	Post,
	Patch, 
	Delete,
	UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from './role.service';
import { CreateRoleDTO, UpdateRoleDTO } from './dto/role.dto';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

// var roles = 'ADMIN'

@ApiTags('Roles')
@UseGuards(RolesGuard)
@Controller('roles')
export class RoleController {
	constructor(private readonly roleService: RoleService) { }

	/**
	 * @route   POST /api/v1/roles
	 * @desc    Create a new role
	 * @access  Public
	 */
	@Post()
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Create new role' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async create(@Res() res, @Body() createRoleDto: CreateRoleDTO) {
		const role = await this.roleService.create(createRoleDto);

		return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'The Role has been successfully created.',
			data: role
		});
	}

	/**
	 * @route   GET /api/v1/roles
	 * @desc    Get all role
	 * @access  Public
	 */
	@Get()
	// @UseGuards(AuthGuard('jwt'))
	// @Roles('Administrator')
	@ApiOperation({ summary: 'Get all role' })

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
		const role = await this.roleService.findAll(req.query);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get roles`,
			data: role
		});
	}

	/**
	 * @route    Get /api/v1/roles/:id
	 * @desc     Get role by ID
	 * @access   Public
	 */
	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Get role by id' })
	@ApiHeader({
		name: 'x-auth-token',
	 	description: 'token'
	})
	async findById(@Param('id') id: string, @Res() res)  {
		const role = await this.roleService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get role by id ${id}`,
			data: role
		});
	}
	
	/**
	 * @route   Patch /api/v1/roles/:id
	 * @desc    Update role by Id
	 * @access  Public
	 **/
	@Patch(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Update role by id' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})
	async update(
		@Param('id') id: string,
		@Res() res,
		@Body() updateRoleDto: UpdateRoleDTO
	) {
		const role = await this.roleService.update(id, updateRoleDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Role has been successfully updated.',
			data: role
		});
	}

	/**
	 * @route   Delete /api/v1/roles/:id
	 * @desc    Delete role by ID
	 * @access  Public
	 **/
	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Delete role' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})
	async delete(@Param('id') id: string, @Res() res){
		const role = await this.roleService.delete(id);
		
		if (role == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove role by id ${id}`
			});
		}
	}
}
