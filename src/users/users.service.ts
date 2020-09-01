import { 
    Injectable, 
    BadRequestException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUsersDTO } from './dto/create-users.dto';
import { IUser } from './interface/users.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async createUser(createUsersDTO: CreateUsersDTO): Promise<IUser> {
        const user = new this.userModel(createUsersDTO);

        // Check if user email is already exist
        const isEmailExist = await this.userModel.findOne({ email: user.email });
        if (isEmailExist) {
            throw new BadRequestException('That email is already exist.');
        }

        await user.save();
        return user;
    }
}
