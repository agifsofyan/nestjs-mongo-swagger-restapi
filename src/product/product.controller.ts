import { 
	Controller, 
	Get, 
	Response, 
	HttpStatus, 
	Param, 
	Body, 
	Post, 
	Request, 
	Patch, 
	Delete
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('products')
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
			message: 'The Product has been successfully created.',
			product
		});
	}

	/**
	 * @route   GET /api/v1/products
	 * @desc    Get all product
	 * @access  Public
	 */
	@Get()
	@ApiResponse({
	       status: 200,
	       description: 'Get all product' 
	})
	async findAll(@Response() res) {
		const product = await this.productService.findAll();
		return res.status(HttpStatus.OK).json(product);
	}

	/**
	 * @route    GET
         * @desc     Get product by condition (filter)
         * @access   Public
	 **/
	@Get('find')
	@ApiResponse({
		status: 200,
		description: 'Get product by condition(filter)'
	})
	async find(@Response() res, @Body() body){
		const filter = body;
		const product = await this.productService.findOne(filter);
		return res.status(HttpStatus.OK).json(product);
	}

	/**
	 * @route    Get /api/v1/products/:id
	 * @desc     Get product by ID
	 * @access   Public
	 */
	 @Get(':id')
	 @ApiResponse({
		 status: 200,
		 description: 'Get product by ID'
	 })
	 async findById(@Response() res, @Param() param)  {
		const product = await this.productService.findById(param.id);
		return res.status(HttpStatus.OK).json(product);
	 }
	
	 /**
	  * @route   Patch /api/v1/products/:id
	  * @desc    Update product by Id
	  * @access  Public
	  **/
	  @Patch(':id')
	  @ApiResponse({ 
		  status: 200,
		  description: 'Update product'
	  })
	  async update(
		  @Param() param,
		  @Response() res,
		  @Body() body
	  ){
	  	const product = this.productService.update(param.id, body);
		return res.status(HttpStatus.OK).json(product);
	  }

	  /**
	   * @route   Delete /api/v1/products/:id
	   * @desc    Delete product by ID
	   * @access  Public
	   **/
	  @Delete(':id')
	  @ApiResponse({ 
		  status: 200,
		  description: 'Delete product' 
	  })
	  async delete(@Param() param, @Response() res){
	  	const product = await this.productService.delete(param.id);
		return res.status(HttpStatus.OK).json(product);
	  }
}
