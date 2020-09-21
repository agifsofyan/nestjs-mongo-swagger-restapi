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
import { ApiTags, ApiOperation, ApiHeader, ApiQuery, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';

var inRole = ["SUPERADMIN", "IT", "ADMIN"];

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
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Create new product' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async create(@Res() res, @Body() createProductDto: CreateProductDTO) {
		const product = await this.productService.create(createProductDto);
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
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Get all product & Search anything' })

	// Swagger Header [required]
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token'
	})

	// Swagger Parameter [optional] 2
	@ApiQuery({
		name: 'optFields',
		required: false,
		explode: true,
		type: String,
		isArray: false
	})
	
	@ApiQuery({
		name: 'optVal',
		required: false,
		explode: true,
		type: String,
		isArray: false
	})
	
	// Swagger Parameter [optional] 1
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
			total: product.length,
			data: product
		});
	}

	/**
	 * @route   Get /api/v1/products/:id
	 * @desc    Get product by Id
	 * @access  Public
	 **/

	@Get(':id')

	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Get Product By Id' })

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
	 * @route   Put /api/v1/products/:id
	 * @desc    Update product by Id
	 * @access  Public
	 **/

	@Put(':id')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Update product by id' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async update(
		@Param('id') id: string,
		@Res() res,
		@Body() updateProductDto: UpdateProductDTO
	) {
		const product = await this.productService.update(id, updateProductDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Product has been successfully updated.',
			data: product
		});
	}

	/**
	 * @route   Delete /api/v1/products/:id
	 * @desc    Delete product by ID
	 * @access  Public
	 **/

	@Delete(':id')

	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

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

	/**
	 * @route   Get /api/v1/product/find/search
	 * @desc    Search product by name
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

	// @ApiBody({
	// 	required: false,
	// 	description: 'search anything name',
	// 	type: Object,
	// 	isArray: false
	// })

	@ApiProperty({
		example: 'Army',
		description: 'Search',
		format: 'string'
	})

	async search(@Res() res, @Body() search: any) {
		const product = await this.productService.search(search);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success search product`,
			total: product.length,
			data: product
		});
	}
}
