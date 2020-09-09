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
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
// import { DTopic } from '../topic/topic.decorator';
// import { ITopic } from '../topic/interface/topic.interface';

@ApiTags('Products')
@UseGuards(RolesGuard)
@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	/**
	 * @route   POST /api/v1/products
	 * @desc    Create a new product
	 * @access  Public
	 */
	@Post()
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Create new product' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async create(@Res() res, @Body() productDto: ProductDto) {
		const product = await this.productService.create(productDto);
		return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'The Product has been successfully created.',
			data: product
		});
	}

	/**
	 * @route   GET /api/v1/products
	 * @desc    Get all product
	 * @access  Public
	 */
	@Get()
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Get all product' })

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
		const product = await this.productService.findAll(req.query);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get products`,
			data: product
		});
	}

	/**
	 * @route    GET
	 * @desc     Get product by condition (filter)
	 * @access   Public
	 **/
	@Get('find')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Filter product' })
	@ApiHeader({
	 	name: 'x-auth-token',
	 	description: 'token'
	})
	async findOne(@Res() res, @Body() body){
		const filter = body;
		const product = await this.productService.findOne(filter);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get product`,
			data: product
		});
	}

	/**
	 * @route    Get /api/v1/products/:id
	 * @desc     Get product by ID
	 * @access   Public
	 */
	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Get product by id' })
	@ApiHeader({
		name: 'x-auth-token',
	 	description: 'token'
	})
	async findById(@Param('id') id: string, @Res() res)  {
		const product = await this.productService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get product by id ${id}`,
			data: product
		});
	}
	
	/**
	 * @route   Patch /api/v1/products/:id
	 * @desc    Update product by Id
	 * @access  Public
	 **/
	@Patch(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Update product by id' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})
	// async createUpdateProfile(@Body() createproductDTO: ProductDto, @DTopic() topic: ITopic) {
    //     return await this.productService.createUpdate(createproductDTO, topic);
    // }

	// async update(
	// 	@Param('id') id: string,
	// 	@Res() res,
	// 	@Body() newProductDto: ProductDto
	// ) {
	// 	const product = await this.productService.update(id, newProductDto);
	// 	return res.status(HttpStatus.OK).json({
	// 		statusCode: HttpStatus.OK,
	// 		message: 'The Product has been successfully updated.',
	// 		data: product
	// 	});
	// }

	/**
	 * @route   Delete /api/v1/products/:id
	 * @desc    Delete product by ID
	 * @access  Public
	 **/
	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Delete product' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})
	async delete(@Param('id') id: string, @Res() res){
		const product = await this.productService.delete(id);
		
		if (product == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove product by id ${id}`
			});
		}
	}
}
