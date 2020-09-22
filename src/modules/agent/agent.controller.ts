import { 
    UseGuards,
    Controller,
    Post,
    Get,
    Res,
    Req,
    Body,
	Param,
    HttpStatus,
    NotFoundException
} from '@nestjs/common';
import { 
	ApiTags, 
	ApiOperation, 
	ApiHeader,
	ApiBody,
	ApiQuery
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { SearchDTO } from '../user/dto/user.dto';

var inRole = ["SUPERADMIN", "IT", "ADMIN"];

@ApiTags('Agents - [SUPERADMIN & ADMIN]')
@UseGuards(RolesGuard)
@Controller('agents')
export class AgentController {
    constructor(
	    private readonly userService: UserService,
	    private readonly roleService: RoleService
    ) {}

	@Get()

	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Get all agent' })

	// Swagger Header [required]
	@ApiHeader({
		name: 'x-auth-token',
		description: 'token'
	})
	
	async findAll(@Req() req, @Res() res) {
		const value = { search: 'SALES' }
		const checkSellerRole = await this.roleService.search(value)

		if(!checkSellerRole){
			throw new NotFoundException(`Not Found Agent(Sales) Role`)
		}
		
		const roleId = checkSellerRole[0]._id
		
		const data = await this.userService.find({
			role: {$in:[roleId]}
		});
		
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get agents`,
			total: data.length,
			data: data
		});
	}

	/**
	 * @route    Get /api/v1/users/:id
	 * @desc     Get user/administrator by ID
	 * @access   Public
	 */

	@Get(':id')
	
	@Roles(...inRole)
	@UseGuards(AuthGuard('jwt'))

	@ApiOperation({ summary: 'Get Agent by id' })

	@ApiHeader({
		name: 'x-auth-token',
	 	description: 'token'
	})

	@ApiQuery({
		name: 'id',
		required: true,
		explode: true,
		type: String,
		isArray: false
	})

	async findById(@Param('id') id: string, @Res() res)  {
		const user = await this.userService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get agent(sales) by id ${id}`,
			data: user
		});
	}

	/**
	 * @route   Post /api/v1/agents/find/search
	 * @desc    Search agent by name
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

	//@ApiBody({
	//	required: true,
	//	description: 'search anything name',
	//	type: Object,
	//	isArray: false
	//})

	async search(@Res() res, @Body() searchVal: SearchDTO) {
		const sales = { search: 'SALES' }
		const checkSellerRole = await this.roleService.search(sales)
		
		if(!checkSellerRole){
			throw new NotFoundException(`Not Found Agent(Sales) Role`)
		}
		
		const roleId = checkSellerRole[0]._id
		
		//console.log(roleId)
		//console.log(searchVal)
		const result = await this.userService.searchAgent(roleId, searchVal);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success search agent`,
			total: result.length,
			data: result
		});
	}
}
