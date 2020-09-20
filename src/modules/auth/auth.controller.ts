import { 
    Controller, 
    Post, 
    Body, 
    UseGuards, 
    Request,
    Req,
    Get,
    Res,
    HttpStatus, 
    UsePipes, 
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { AuthLoginDTO } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';

var inRole = ["SUPERADMIN", "IT", "ADMIN", "SALES", "CONTENT", "FINANCE", "MENTOR"];

@ApiTags('Auth')
@UseGuards(RolesGuard)
@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    @UsePipes(ValidationPipe)

    /**
     * @route   POST api/v1/auth/login
     * @desc    Authenticate user
     * @access  Public
     */

    @Post('login')

    @ApiOperation({ summary: 'Aministrator Login' })

    async login(@Request() request, @Res() res, @Body() authLoginDTO: AuthLoginDTO) {
        const result = await this.authService.login(request, authLoginDTO)

        return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			result
		});
    }

    /**
     * @route   POST api/v1/auth/me
     * @desc    Get Authenticate user
     * @access  Public
     */

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @Roles(...inRole)

    @ApiOperation({ summary: 'who am i' })
    
    @ApiHeader({
	    name: 'x-auth-token',
	    description: 'token.'
    })

    async getUser(@Res() res, @Request() request) {
        const { id, name, email, phone_number, role } = request.user

        const user = {
            id, name, email, phone_number, role
        }

        return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			data: user
		});
    }
}
