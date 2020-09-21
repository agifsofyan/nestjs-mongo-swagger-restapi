import { 
	Injectable, 
	NotFoundException, 
	BadRequestException,
	NotImplementedException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IReseller } from './interface/reseller.interface';
import { CreateResellerDTO, UpdateResellerDTO } from './dto/reseller.dto';
import { Query } from 'src/utils/OptQuery';

@Injectable()
export class ResellerService {

	constructor(@InjectModel('Reseller') private readonly resellerModel: Model<IReseller>) {}

	async create(createResellerDto: CreateResellerDTO): Promise<IReseller> {
		const createReseller = new this.resellerModel(createResellerDto);
		return await createReseller.save();
	}

	async findAll(options: Query): Promise<IReseller[]> {
		const offset = (options.offset == 0 ? options.offset : (options.offset - 1));
		const skip = offset * options.limit;
		const sortval = (options.sortval == 'asc') ? 1 : -1;

		if (options.sortby){
			if (options.fields) {

				return await this.resellerModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.exec();

			} else {

				return await this.resellerModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.exec();

			}
		}else{
			if (options.fields) {

				return await this.resellerModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.exec();

			} else {

				return await this.resellerModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.exec();

			}
		}
	}

	async findById(id: string): Promise<IReseller> {
	 	let result;
		try{
		    result = await this.resellerModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find reseller with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find reseller with id ${id}`);
		}

		return result;
	}

	async update(id: string, updateResellerDto: UpdateResellerDTO): Promise<IReseller> {
		let result;
		
		// Check ID
		try{
		    result = await this.resellerModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find reseller with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find reseller with id ${id}`);
		}

		await this.resellerModel.findByIdAndUpdate(id, updateResellerDto);
		return await this.resellerModel.findById(id).exec();
	}

	async delete(id: string): Promise<string> {
		try{
			await this.resellerModel.findByIdAndRemove(id).exec();
			return 'ok';
		}catch(err){
			throw new NotImplementedException('The reseller could not be deleted');
		}
	}

	async search(value: string): Promise<IReseller[]> {
		const role = await this.resellerModel.find({"type": {$regex: ".*" + value + ".*"}})

		if(!role){
			throw new NotFoundException(`Could nod find reseller with your condition`)
		}

		return role
	}
}
