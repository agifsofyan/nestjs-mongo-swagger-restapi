import { 
    UseGuards,
    Controller,
    Get,
    Res,
    Req,
	Param,
    HttpStatus,
    NotFoundException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';

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
		const checkSellerRole = await this.roleService.search('SALES')
		
		if(!checkSellerRole){
			throw new NotFoundException(`Not Found Agent(Sales) Roles`)
		}
		
		const roleId = checkSellerRole[0]._id
		
		const options: object = { role: [roleId] }

		const data = await this.userService.find(options);
		
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
	async findById(@Param('id') id: string, @Res() res)  {
		const user = await this.userService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get agent(sales) by id ${id}`,
			data: user
		});
	}
}
