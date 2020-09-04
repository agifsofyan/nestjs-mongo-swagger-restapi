import { 
    UseGuards,
    Controller,
    Res,
    Req,
    Post,
    Body,
    HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLoginDTO } from './dto/login.dto';
import { RefreshAccessTokenDTO } from '../auth/dto/refresh-access-token.dto';

@ApiTags('Users')
@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
	 * @route   POST /api/v1/users
	 * @desc    Create a new user
	 * @access  Public
	 */
    @Post('add')
    //@UseGuards(AuthGuard('jwt'))
	//@Roles('Administrator')
	@ApiOperation({ summary: 'Add new administrator' })
	//@ApiHeader({
        //name: 'Bearer',
        //description: 'Authentication token.'
    //})
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.create(createUserDTO);
        return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'User created successfully.',
			data: user
		});
    }

    /**
     * @route   POST api/v1/users/login
     * @desc    Authenticate user
     * @access  Public
     */
    @Post('login')
    @ApiOperation({ summary: 'User Login' })
    async login(@Req() req: Request, @Body() userLoginDTO: UserLoginDTO) {
        return await this.userService.login(req, userLoginDTO);
    }

    /**
     * @route   POST api/v1/users/refresh-access-token
     * @desc    Refresh user access token
     * @access  Public
     */
    @Post('refresh-access-token')
    @ApiOperation({ summary: 'Refresh Access Token' })
    async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDTO) {
        return await this.userService.refreshAccessToken(refreshAccessTokenDto);
    }
}
