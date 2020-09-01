import { 
    UseGuards,
    Controller,
    Res,
    Post,
    Body,
    HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@ApiTags('users')
@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    /**
	 * @route   POST /api/v1/users
	 * @desc    Create a new user
	 * @access  Public
	 */
    @Post()
    @UseGuards(AuthGuard('jwt'))
	@Roles('administrator')
	@ApiOperation({ summary: 'Create new product' })
	@ApiHeader({
        name: 'Bearer',
        description: 'Authentication token.'
    })
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'User created successfully.',
			data: user
		});
    }

}
