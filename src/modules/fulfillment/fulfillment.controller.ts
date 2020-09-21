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
import { FulfillmentService } from './fulfillment.service';
import { CreateFulfillmentDTO, UpdateFulfillmentDTO } from './dto/fulfillment.dto';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery, ApiBody, ApiProperty } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

var inRole = ["SUPERADMIN", "IT", "ADMIN"];

@ApiTags('Fulfillments - [SUPERADMIN & ADMIN]')
@UseGuards(RolesGuard)
@Controller('fulfillments')
export class FulfillmentController {
	constructor(private readonly fulfillmentService: FulfillmentService) { }

	/**
	 * @route   POST /api/v1/fulfillments
	 * @desc    Create a new fulfillment
	 * @access  Public
	 */
	@Post()
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Create new fulfillment' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async create(@Res() res, @Body() createFulfillmentDto: CreateFulfillmentDTO) {
		const fulfillment = await this.fulfillmentService.create(createFulfillmentDto);

		return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'The Fulfillment has been successfully created.',
			data: fulfillment
		});
	}

	/**
	 * @route   GET /api/v1/fulfillments
	 * @desc    Get all fulfillment
	 * @access  Public
	 */
	@Get()
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Get all fulfillment' })

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
		const fulfillment = await this.fulfillmentService.findAll(req.query);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get fulfillments`,
			total: fulfillment.length,
			data: fulfillment
		});
	}

	/**
	 * @route    Get /api/v1/fulfillments/:id
	 * @desc     Get fulfillment by ID
	 * @access   Public
	 */
	@Get(':id')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Get fulfillment by id' })

	@ApiHeader({
		name: 'x-auth-token',
	 	description: 'token'
	})

	async findById(@Param('id') id: string, @Res() res)  {
		const fulfillment = await this.fulfillmentService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get fulfillment by id ${id}`,
			data: fulfillment
		});
	}
	
	/**
	 * @route   Put /api/v1/fulfillments/:id
	 * @desc    Update fulfillment by Id
	 * @access  Public
	 **/

	@Put(':id')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Update fulfillment by id' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async update(
		@Param('id') id: string,
		@Res() res,
		@Body() updateFulfillmentDto: UpdateFulfillmentDTO
	) {
		const fulfillment = await this.fulfillmentService.update(id, updateFulfillmentDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Fulfillment has been successfully updated.',
			data: fulfillment
		});
	}

	/**
	 * @route   Delete /api/v1/fulfillments/:id
	 * @desc    Delete fulfillment by ID
	 * @access  Public
	 **/
	@Delete(':id')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Delete fulfillment' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})
	
	async delete(@Param('id') id: string, @Res() res){
		const fulfillment = await this.fulfillmentService.delete(id);
		
		if (fulfillment == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove fulfillment by id ${id}`
			});
		}
	}

	/**
	 * @route   Get /api/v1/fulfillments/find/search
	 * @desc    Select fulfillment by name
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
		example: 'Something',
		description: 'Search',
		format: 'string'
	})

	async search(@Res() res, @Body() search: any) {
		const fullfillment = await this.fulfillmentService.search(search);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success search fullfillment`,
			total: fullfillment.length,
			data: fullfillment
		});
	}
}
