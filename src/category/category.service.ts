import { 
	Injectable, 
	NotFoundException, 
	BadRequestException,
	NotImplementedException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICategory } from './interface/category.interface';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto/category.dto';
import { Query } from '../utils/OptQuery';

@Injectable()
export class CategoryService {

	constructor(@InjectModel('Category') private readonly categoryModel: Model<ICategory>) {}

	async create(createCategoryDto: CreateCategoryDTO): Promise<ICategory> {
		const createCategory = new this.categoryModel(createCategoryDto);

		// Check if category name is already exist
        const isCategoryNameExist = await this.categoryModel.findOne({ name: createCategory.name });
        	
		if (isCategoryNameExist) {
        	throw new BadRequestException('That category name (slug) is already exist.');
		}

		return await createCategory.save();
	}

	async findAll(options: Query): Promise<ICategory[]> {
		const offset = (options.offset == 0 ? options.offset : (options.offset - 1));
		const skip = offset * options.limit;
		const sortval = (options.sortval == 'asc') ? 1 : -1;

		if (options.sortby){
			if (options.fields) {

				return await this.categoryModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.exec();

			} else {

				return await this.categoryModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.exec();

			}
		}else{
			if (options.fields) {

				return await this.categoryModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.exec();

			} else {

				return await this.categoryModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.exec();

			}
		}
	}

	async findById(id: string): Promise<ICategory> {
	 	let result;
		try{
		    result = await this.categoryModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find category with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find category with id ${id}`);
		}

		return result;
	}

	async update(id: string, updateCategoryDto: UpdateCategoryDTO): Promise<ICategory> {
		let result;
		
		// Check ID
		try{
		    result = await this.categoryModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find category with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find category with id ${id}`);
		}

		await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
		return await this.categoryModel.findById(id).exec();
	}

	async delete(id: string): Promise<string> {
		try{
			await this.categoryModel.findByIdAndRemove(id).exec();
			return 'ok';
		}catch(err){
			throw new NotImplementedException('The category could not be deleted');
		}
	}
}
