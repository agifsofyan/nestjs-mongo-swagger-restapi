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

import { CreateUserDTO } from '../user/dto/create-user.dto';
import { UserLoginDTO } from '../user/dto/login.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';

var role: string = "ADMIN";

@ApiTags('Auth')
@UseGuards(RolesGuard)
@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    @UsePipes(ValidationPipe)

  //   @Post('register')

  //   @ApiOperation({ summary: 'Register' })

  //   async postRegister(@Res() res, @Body() createUserDTO: CreateUserDTO) {

  //       const user = await this.userService.create(createUserDTO)

  //       const result = await this.authService.createToken(user)

  //       return res.status(HttpStatus.CREATED).json({
		// 	statusCode: HttpStatus.CREATED,
		// 	result
		// });
  //   }

    /**
     * @route   POST api/v1/users/login
     * @desc    Authenticate user
     * @access  Public
     */


    // @UseGuards(LocalAuthGuard)
    @Post('login')

    @ApiOperation({ summary: 'Aministrator Login' })

    async login(@Request() request, @Res() res, @Body() userLoginDTO: UserLoginDTO) {
        const result = await this.authService.login(request, userLoginDTO)

        return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			result
		});
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @Roles(role)

    @ApiOperation({ summary: 'who am i' })
    
    @ApiHeader({
	    name: 'Authorization',
	    description: 'token.'
    })

    async getUser(@Res() res, @Request() request) {
        const { id, name, email, phone_number, role } = request.user

        const user = {
            id, name, email, phone_number, role
        }

        return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			result: user
		});
    }
}
