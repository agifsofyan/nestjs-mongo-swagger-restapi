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
import { TopicService } from './topic.service';
import { CreateTopicDTO, UpdateTopicDTO } from './dto/topic.dto';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Topics')
@UseGuards(RolesGuard)
@Controller('topics')
export class TopicController {
	constructor(private readonly topicService: TopicService) { }

	/**
	 * @route   POST /api/v1/topics
	 * @desc    Create a new topic
	 * @access  Public
	 */
	@Post()
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Create new topic' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async create(@Res() res, @Body() createTopicDto: CreateTopicDTO) {
		const topic = await this.topicService.create(createTopicDto);

		return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'The Topic has been successfully created.',
			data: topic
		});
	}

	/**
	 * @route   GET /api/v1/topics
	 * @desc    Get all topic
	 * @access  Public
	 */
	@Get()
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Get all topic' })

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
		const topic = await this.topicService.findAll(req.query);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get topics`,
			data: topic
		});
	}

	/**
	 * @route    Get /api/v1/topics/:id
	 * @desc     Get topic by ID
	 * @access   Public
	 */
	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Get topic by id' })
	@ApiHeader({
		name: 'x-auth-token',
	 	description: 'token'
	})
	async findById(@Param('id') id: string, @Res() res)  {
		const topic = await this.topicService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get topic by id ${id}`,
			data: topic
		});
	}
	
	/**
	 * @route   Patch /api/v1/topics/:id
	 * @desc    Update topic by Id
	 * @access  Public
	 **/
	@Patch(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Update topic by id' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})
	async update(
		@Param('id') id: string,
		@Res() res,
		@Body() updateTopicDto: UpdateTopicDTO
	) {
		const topic = await this.topicService.update(id, updateTopicDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Topic has been successfully updated.',
			data: topic
		});
	}

	/**
	 * @route   Delete /api/v1/topics/:id
	 * @desc    Delete topic by ID
	 * @access  Public
	 **/
	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	@Roles('Administrator')
	@ApiOperation({ summary: 'Delete topic' })
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})
	async delete(@Param('id') id: string, @Res() res){
		const topic = await this.topicService.delete(id);
		
		if (topic == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove topic by id ${id}`
			});
		}
	}
}
