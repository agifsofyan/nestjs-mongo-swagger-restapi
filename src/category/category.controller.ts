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
import { CategoryService } from './category.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto/category.dto';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Categories')
@UseGuards(RolesGuard)
@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }

	/**
	 * @route   POST /api/v1/categorys
	 * @desc    Create a new category
	 * @access  Public
	 */
	@Post()
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Create new category' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async create(@Res() res, @Body() createCategoryDto: CreateCategoryDTO) {
		const category = await this.categoryService.create(createCategoryDto);

		return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'The Category has been successfully created.',
			data: category
		});
	}

	/**
	 * @route   GET /api/v1/categorys
	 * @desc    Get all category
	 * @access  Public
	 */
	@Get()
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Get all category' })

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
		const category = await this.categoryService.findAll(req.query);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get categorys`,
			data: category
		});
	}

	/**
	 * @route    Get /api/v1/categorys/:id
	 * @desc     Get category by ID
	 * @access   Public
	 */
	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Get category by id' })
	@ApiHeader({
		name: 'x-auth-token',
	 	description: 'token'
	})
	async findById(@Param('id') id: string, @Res() res)  {
		const category = await this.categoryService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get category by id ${id}`,
			data: category
		});
	}
	
	/**
	 * @route   Patch /api/v1/categorys/:id
	 * @desc    Update category by Id
	 * @access  Public
	 **/
	@Patch(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Update category by id' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})
	async update(
		@Param('id') id: string,
		@Res() res,
		@Body() updateCategoryDto: UpdateCategoryDTO
	) {
		const category = await this.categoryService.update(id, updateCategoryDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Category has been successfully updated.',
			data: category
		});
	}

	/**
	 * @route   Delete /api/v1/categorys/:id
	 * @desc    Delete category by ID
	 * @access  Public
	 **/
	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Delete category' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})
	async delete(@Param('id') id: string, @Res() res){
		const category = await this.categoryService.delete(id);
		
		if (category == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove category by id ${id}`
			});
		}
	}
}
