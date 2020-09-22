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

import { 
	ApiTags, 
	ApiOperation, 
	ApiHeader, 
	ApiQuery
} from '@nestjs/swagger';

import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';

import { TopicService } from './topic.service';
import { 
	CreateTopicDTO, 
	UpdateTopicDTO, 
	DeleteManyDTO,
	SearchDTO
} from './dto/topic.dto';

var inRole = ["SUPERADMIN", "IT", "ADMIN"];

@ApiTags('Topics - [SUPERADMIN & ADMIN]')
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
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

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
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

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
			total: topic.length,
			data: topic
		});
	}

	/**
	 * @route    Get /api/v1/topics/:id
	 * @desc     Get topic by ID
	 * @access   Public
	 */

	@Get(':id')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

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
	 * @route   Put /api/v1/topics/:id
	 * @desc    Update topic by Id
	 * @access  Public
	 **/

	@Put(':id')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

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
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

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

	/**
	 * @route   Delete /api/v1/topics/delete/multiple
	 * @desc    Delete topic by multiple ID
	 * @access  Public
	 **/

	@Delete('delete/multiple')

	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Delete multiple topic' })

	@ApiHeader({
		name: 'x-auth-token',
		description: 'token.'
	})

	async deleteMany(@Res() res, @Body() arrayId: DeleteManyDTO) {
		//console.log(arrayId)
		const topic = await this.topicService.deleteMany(arrayId);
		if (topic == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove topic by id in: [${arrayId.id}]`
			});
		}
	}

	/**
	 * @route   Post /api/v1/topics/find/search
	 * @desc    Search topic by name
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

	async search(@Res() res, @Body() search: SearchDTO) {
		console.log(search)
		const result = await this.topicService.search(search);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success search topic`,
			total: result.length,
			data: result
		});
	}
}
