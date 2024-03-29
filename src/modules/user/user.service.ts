import { 
    Injectable, 
    BadRequestException, 
    NotFoundException,
    NotImplementedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { 
    CreateUserDTO, 
    UpdateUserDTO,
    DeleteManyDTO,
    SearchDTO
} from './dto/user.dto';
import { IUser } from './interface/user.interface';
import { Query } from 'src/utils/OptQuery';

export type User = IUser

@Injectable()
export class UserService {
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

    async update(id: string, updateUserDto: UpdateUserDTO): Promise<IUser> {
		let data;
		
		// Check ID
		try{
		    data = await this.userModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find topic with id ${id}`);
		}

		if(!data){
			throw new NotFoundException(`Could nod find topic with id ${id}`);
		}

		await this.userModel.findByIdAndUpdate(id, updateUserDto);
		return await this.userModel.findById(id).exec();
	}

    async findAll(options: Query): Promise<IUser[]> {
        const offset = (options.offset == 0 ? options.offset : (options.offset - 1));
        const skip = offset * options.limit;
        const sortval = (options.sortval == 'asc') ? 1 : -1;

        if (options.sortby) {
            if (options.fields) {

                return await this.userModel
                    .find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
                    .skip(Number(skip))
                    .limit(Number(options.limit))
                    .sort({ [options.sortby]: sortval })
                    .populate('role')

            } else {

                return await this.userModel
                    .find()
                    .skip(Number(skip))
                    .limit(Number(options.limit))
                    .sort({ [options.sortby]: sortval })
                    .populate('role')

            }
        } else {
            if (options.fields) {

                return await this.userModel
                    .find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
                    .skip(Number(skip))
                    .limit(Number(options.limit))
                    .sort({ 'created_at': 'desc' })
                    .populate('role')

            } else {

                return await this.userModel
                    .find()
                    .skip(Number(skip))
                    .limit(Number(options.limit))
                    .sort({ 'created_at': 'desc' })
                    .populate('role')
            }
        }
    }

    async findById(id: string): Promise<IUser> {
        let data;
       try{
           data = await this.userModel.findById(id);
       }catch(error){
           throw new NotFoundException(`Could nod find user/administrator with id ${id}`);
       }

       if(!data){
           throw new NotFoundException(`Conestjs mongodb tutorialsuld nod find user/administrator with id ${id}`);
       }

       return data;
   }

    async delete(id: string): Promise<string> {
        try{
            await this.userModel.findByIdAndRemove(id).exec();
            return 'ok';
        }catch(err){
            throw new NotImplementedException('The user/administrator could not be deleted');
        }
    }

    async deleteMany(arrayId: DeleteManyDTO): Promise<string> {
        try {
            await this.userModel.deleteMany({ _id: { $in: arrayId.id } });
            return 'ok';
        } catch (err) {
            throw new NotImplementedException('The user/administrator could not be deleted');
        }
    }

    async findOne(options: object): Promise<IUser> {
    	const data = await this.userModel.findOne(options).populate('role')

    	if(!data){
    		throw new NotFoundException(`Could nod find user/administrator with your condition.`)
    	}

    	return data
    }

    async find(options: object): Promise<IUser[]> {
        const data = await this.userModel.find(options, {"_id": 1, "name": 1, "email": 1})

    	if(!data){
    		throw new NotFoundException(`Could not find user/administrator`)
    	}

    	return data
    }

    async search(value: SearchDTO): Promise<IUser[]> {
        const result = await this.userModel.find({
            $or: [
                { name: {$regex: ".*" + value.search + ".*", $options: "i"} },
                { email: {$regex: ".*" + value.search + ".*", $options: "i"} }
            ]
        })

        if (!result) {
            throw new NotFoundException("Your search was not found")
        }

        return result
    }

    async searchAgent(id: string, value: SearchDTO): Promise<IUser[]> {
        const result = await this.userModel.find({
	   role: {$in: [id]},
	   $or: [
                { name: {$regex: ".*" + value.search + ".*", $options: "i"} },
                { email: {$regex: ".*" + value.search + ".*", $options: "i"} }
           ]
        },{"_id": 1, "name": 1, "email": 1})

        if (!result) {
            throw new NotFoundException("Your search was not found")
        }

        return result
    }
}
