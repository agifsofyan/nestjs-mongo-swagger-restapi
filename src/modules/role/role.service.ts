import { 
	Injectable, 
	NotFoundException, 
	BadRequestException,
	NotImplementedException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IRole } from './interface/role.interface';
import { 
	CreateRoleDTO, 
	UpdateRoleDTO,
	DeleteManyDTO,
	SearchDTO
} from './dto/role.dto';
import { Query } from 'src/utils/OptQuery';

@Injectable()
export class RoleService {

	constructor(@InjectModel('Role') private readonly roleModel: Model<IRole>) {}

	async create(createRoleDto: CreateRoleDTO): Promise<IRole> {
		const createRole = new this.roleModel(createRoleDto);

		const { adminType } = createRoleDto

		//console.log('createRoleDto', createRoleDto);
		const type = adminType.toUpperCase()

		const AdminTypeExist = await this.roleModel.findOne({ adminType: type })
        	
		if (AdminTypeExist) {
        	throw new BadRequestException('That Admin Type is already exist.')
		}

		createRole.adminType = type

		return await createRole.save();
	}

	async findAll(options: Query): Promise<IRole[]> {
		const offset = (options.offset == 0 ? options.offset : (options.offset - 1));
		const skip = offset * options.limit;
		const sortval = (options.sortval == 'asc') ? 1 : -1;

		if (options.sortby){
			if (options.fields) {

				return await this.roleModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.exec();

			} else {

				return await this.roleModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.exec();

			}
		}else{
			if (options.fields) {

				return await this.roleModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'created_at': 'desc' })
					.exec();

			} else {

				return await this.roleModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'created_at': 'desc' })
					.exec();

			}
		}
	}

	async findById(id: string): Promise<IRole> {
	 	let data;
		try{
		    data = await this.roleModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find role with id ${id}`);
		}

		if(!data){
			throw new NotFoundException(`Could nod find role with id ${id}`);
		}

		return data;
	}

	async update(id: string, updateRoleDto: UpdateRoleDTO): Promise<IRole> {
		//console.log('updateRoleDto', updateRoleDto);
		let data;
		
		// Check ID
		try{
		    data = await this.roleModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find role with id ${id}`);
		}

		if(!data){
			throw new NotFoundException(`Could nod find role with id ${id}`);
		}
		const { adminType } = updateRoleDto

		if(adminType){
			updateRoleDto.adminType = adminType.toUpperCase()
		}

		await this.roleModel.findByIdAndUpdate(id, updateRoleDto);

		//console.log('fbu', fbu);
		return await this.roleModel.findById(id).exec();
	}

	async delete(id: string): Promise<string> {
		try{
			await this.roleModel.findByIdAndRemove(id).exec();
			return 'ok';
		}catch(err){
			throw new NotImplementedException('The role could not be deleted');
		}
	}

	async deleteMany(arrayId: DeleteManyDTO): Promise<string> {
		try {
			await this.roleModel.deleteMany({ _id: { $in: arrayId.id } });
			return 'ok';
		} catch (err) {
			throw new NotImplementedException('The role could not be deleted');
		}
	}

	async search(value: SearchDTO): Promise<IRole[]> {
		const result = await this.roleModel.find({
			"adminType": {$regex: ".*" + value.search + ".*", $options: "i"}
		})

		if (!result) {
			throw new NotFoundException("Your search was not found")
		}

		return result
	}
}
