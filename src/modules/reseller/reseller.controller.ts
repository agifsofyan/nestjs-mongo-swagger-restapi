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
import { ResellerService } from './reseller.service';
import { CreateResellerDTO, UpdateResellerDTO } from './dto/reseller.dto';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery, ApiBody, ApiProperty } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

var inRole = ["SUPERADMIN", "IT", "ADMIN"];

@ApiTags('Resellers  - [SUPERADMIN & ADMIN]')
@UseGuards(RolesGuard)
@Controller('resellers')
export class ResellerController {
	constructor(private readonly resellerService: ResellerService) { }

	/**
	 * @route   POST /api/v1/resellers
	 * @desc    Create a new reseller
	 * @access  Public
	 */

	@Post()
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Create new reseller' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async create(@Res() res, @Body() createResellerDto: CreateResellerDTO) {
		const reseller = await this.resellerService.create(createResellerDto);

		return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'The Reseller has been successfully created.',
			data: reseller
		});
	}

	/**
	 * @route   GET /api/v1/resellers
	 * @desc    Get all reseller
	 * @access  Public
	 */

	@Get()
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Get all reseller' })

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
		const reseller = await this.resellerService.findAll(req.query);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get resellers`,
			total: reseller.length,
			data: reseller
		});
	}

	/**
	 * @route    Get /api/v1/resellers/:id
	 * @desc     Get reseller by ID
	 * @access   Public
	 */

	@Get(':id')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Get reseller by id' })

	@ApiHeader({
		name: 'x-auth-token',
	 	description: 'token'
	})
	async findById(@Param('id') id: string, @Res() res)  {
		const reseller = await this.resellerService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get reseller by id ${id}`,
			data: reseller
		});
	}
	
	/**
	 * @route   Put /api/v1/resellers/:id
	 * @desc    Update reseller by Id
	 * @access  Public
	 **/

	@Put(':id')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Update reseller by id' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async update(
		@Param('id') id: string,
		@Res() res,
		@Body() updateResellerDto: UpdateResellerDTO
	) {
		const reseller = await this.resellerService.update(id, updateResellerDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Reseller has been successfully updated.',
			data: reseller
		});
	}

	/**
	 * @route   Delete /api/v1/resellers/:id
	 * @desc    Delete reseller by ID
	 * @access  Public
	 **/
	 
	@Delete(':id')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Delete reseller' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async delete(@Param('id') id: string, @Res() res){
		const reseller = await this.resellerService.delete(id);
		
		if (reseller == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove reseller by id ${id}`
			});
		}
	}

	/**
	 * @route   Get /api/v1/resellers/find/search
	 * @desc    Search reseller by name
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

	@ApiBody({
		required: false,
		description: 'search anything name',
		type: Object,
		isArray: false
	})

	// @ApiQuery({
	// 	name: 'search anything name',
	// 	required: false,
	// 	explode: true,
	// 	type: String,
	// 	isArray: false
	// })

	@ApiProperty({
		example: 'Career',
		description: 'Search',
		format: 'string'
	})

	async search(@Res() res, @Body() search: any) {
		const reseller = await this.resellerService.search(search);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success search reseller`,
			total: reseller.length,
			data: reseller
		});
	}
}
