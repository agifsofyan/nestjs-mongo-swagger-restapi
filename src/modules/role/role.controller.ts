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
import { RoleService } from './role.service';
import { CreateRoleDTO, UpdateRoleDTO } from './dto/role.dto';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery, ApiBody, ApiProperty } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

var inRole = ["SUPERADMIN", "IT"];

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
	@Roles(...inRole)

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

	@UseGuards(AuthGuard('jwt'))
	@Roles(...inRole)
	
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
			total: role.length,
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
	@Roles(...inRole)

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
	 * @route   Put /api/v1/roles/:id
	 * @desc    Update role by Id
	 * @access  Public
	 **/

	@Put(':id')

	@UseGuards(AuthGuard('jwt'))
	@Roles(...inRole)

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
	@Roles(...inRole)

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

	/**
	 * @route   Get /api/v1/roles/find/search
	 * @desc    Seacrh role by name
	 * @access  Public
	 **/

	@Get('find/search')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Search and show' })

	@ApiHeader({
	 	name: 'x-auth-token',
	 	description: 'token'
	})

	// @ApiBody({
	// 	required: false,
	// 	description: 'search anything name',
	// 	type: Object,
	// 	isArray: false
	// })

	@ApiProperty({
		example: 'ADMIN',
		description: 'Search',
		format: 'string'
	})

	async search(@Res() res, @Body() search: any) {
		const role = await this.roleService.search(search);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success search role`,
			total: role.length,
			data: role
		});
	}
}
