import { 
    Injectable, 
    BadRequestException, 
    NotFoundException,
    NotImplementedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query } from 'src/utils/OptQuery';
import { IUser } from '../user/interface/user.interface';

@Injectable()
export class SellerService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>
    ) {}

    async findByEmail(email: string): Promise<IUser | undefined> {
        let user = await this.userModel.findOne({ email: email }).populate('role');

        if (!user) {
            throw new BadRequestException('That email not found.');
        }

        delete user.password

        return user;
    }

    async findSeller(options: Query): Promise<IUser[]> {
        // const offset = (options.offset == 0 ? options.offset : (options.offset - 1));
        // const skip = offset * options.limit;
        // const sortval = (options.sortval == 'asc') ? 1 : -1;

        const role = await this.userModel.find().populate('role')

        const result = role.map((res) => {
            return res    
        })

        console.log('role---', role)

        return result
    }

    async findById(id: string): Promise<IUser> {
        let data;
       try{
           data = await this.userModel.findById(id);
       }catch(error){
           throw new NotFoundException(`Could nod find user/administrator with id ${id}`);
       }

       if(!data){
           throw new NotFoundException(`Could nod find user/administrator with id ${id}`);
       }

       return data;
    }
}
