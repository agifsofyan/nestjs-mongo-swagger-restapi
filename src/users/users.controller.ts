import { 
    UseGuards,
    Controller,
    Res,
    Post,
    Body,
    HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UsersService } from './users.service';
import { CreateUsersDTO } from './dto/create-users.dto';

@ApiTags('users')
@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    /**
	 * @route   POST /api/v1/users
	 * @desc    Create a new user
	 * @access  Public
	 */
    @Post()
    @UseGuards(JwtAuthGuard)
	@Roles('administrator')
	@ApiOperation({ summary: 'Create new product' })
	@ApiHeader({
        name: 'Bearer',
        description: 'Authentication token.'
    })
    async addUser(@Res() res, @Body() createUsersDTO: CreateUsersDTO) {
        const user = await this.userService.createUser(createUsersDTO);
        return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'User created successfully.',
			data: user
		});
    }

}
