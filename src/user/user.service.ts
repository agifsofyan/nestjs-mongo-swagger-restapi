import { 
    Injectable, 
    BadRequestException, 
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserLoginDTO } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { RefreshAccessTokenDTO } from '../auth/dto/refresh-access-token.dto';
import { Query } from '../utils/OptQuery';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        private readonly authService: AuthService
    ) {}

    async create(createUserDTO: CreateUserDTO): Promise<IUser> {
        let user = new this.userModel(createUserDTO);

        // Check if user email is already exist
        const isEmailExist = await this.userModel.findOne({ email: user.email });
        if (isEmailExist) {
            throw new BadRequestException('That email is already exist.');
        }

        await user.save();

        user = user.toObject();
        delete user.password;

        return user;
    }

    async login(req: Request, userLoginDTO: UserLoginDTO) {
        let user = await this.userModel.findOne({ email: userLoginDTO.email });
        if (!user) {
            throw new NotFoundException('The email you\'ve entered does not exist.');
        }

        // Verify password
        const match = await bcrypt.compare(userLoginDTO.password, user.password);
        if (!match) {
            throw new NotFoundException('The password you\'ve entered is incorrect.');
        }

        user = user.toObject();
        delete user.password;

        return {
            user,
            accessToken: await this.authService.createAccessToken(user._id),
            refreshToken: await this.authService.createRefreshToken(req, user._id)
        }
    }

    async refreshAccessToken(refreshAccessToken: RefreshAccessTokenDTO) {
        const userId = await this.authService.findRefreshToken(refreshAccessToken.refreshToken);

        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new BadRequestException('User not found.');
        }
        
        return {
            accessToken: await this.authService.createAccessToken(user._id)
        }
    }

    async findAll(options: Query): Promise<IUser[]> {
		const offset = (options.offset == 0 ? options.offset : (options.offset - 1));
		const skip = offset * options.limit;
		const sortval = (options.sortval == 'asc') ? 1 : -1;

		if (options.sortby){
			if (options.fields) {

				return await this.userModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
                    .sort({ [options.sortby]: sortval })
                    // .populate('roles')

			} else {

				return await this.userModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					// .populate('roles')

			}
		}else{
			if (options.fields) {

				return await this.userModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'created_at': 'desc' })
					// .populate('roles')

			} else {

				return await this.userModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'created_at': 'desc' })
					// .populate('roles')
			}
		}
	}
}
