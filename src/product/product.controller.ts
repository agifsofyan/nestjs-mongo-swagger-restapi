import { 
	Controller, 
	Get, 
	Response, 
	HttpStatus, 
	Param, 
	Body, 
	Post,
	Patch, 
	Delete,
	UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('products')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService){}
	
	/**
	 * @route   POST /api/v1/products
	 * @desc    Create a new product
	 * @access  Public
	 */
	@Post()
	
	@ApiOperation({ summary: 'Create new product' })
	@ApiResponse({ status: 403, description: 'forbidden' })
	async create(@Response() res, @Body() productDto: ProductDto) {
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
	
	@ApiResponse({
	       status: HttpStatus.OK,
	       description: 'Get all product' 
	})
	async findAll(@Response() res) {
		const product = await this.productService.findAll();
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
	
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Get product by condition(filter)'
	})
	async findOne(@Response() res, @Body() body){
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
	 
	 @ApiResponse({
		 status: HttpStatus.OK,
		 description: 'Get product by ID'
	 })
	 async findById(@Param('id') id: string, @Response() res)  {
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
	  
	  @ApiResponse({ 
		  status: HttpStatus.OK,
		  description: 'Update product'
	  })
	  async update(
		  @Param('id') id: string,
		  @Response() res,
		  @Body() newProductDto: ProductDto
	  ){
	  	const product = await this.productService.update(id, newProductDto);
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
	  
	  @ApiResponse({ 
		  status: HttpStatus.OK,
		  description: 'Delete product' 
	  })
	  async delete(@Param('id') id: string, @Response() res){
		const product = await this.productService.delete(id);
		
		if (product == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove product by id ${id}`
			});
		}
	  }
}
