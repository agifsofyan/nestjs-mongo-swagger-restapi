import { 
	Injectable, 
	NotFoundException, 
	BadRequestException,
	NotImplementedException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IFulfillment } from './interface/fulfillment.interface';
import { CreateFulfillmentDTO, UpdateFulfillmentDTO } from './dto/fulfillment.dto';
import { Query } from '../utils/OptQuery';

import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class FulfillmentService {

	constructor(
		@InjectModel('Fulfillment') private readonly fulfillmentModel: Model<IFulfillment>,
		private readonly categoryService: CategoryService,
		private readonly productService: ProductService
	) {}

	async create(createFulfillmentDto: CreateFulfillmentDTO): Promise<IFulfillment> {
		const createFulfillment = new this.fulfillmentModel(createFulfillmentDto);

		// Check if fulfillment name is already exist
        const isFulfillmentNameExist = await this.fulfillmentModel.findOne({ name: createFulfillment.name });
        	
		if (isFulfillmentNameExist) {
        	throw new BadRequestException('That fulfillment name (slug) is already exist.');
		}

		var arrayProduct = createFulfillmentDto.product

		for (let i = 0; i < arrayProduct.length; i++) {
			const isProductExist = await this.productService.findById(arrayProduct[i])
			if (! isProductExist) {
				throw new BadRequestException()
			}
		}
		
		var arrayCategory = createFulfillmentDto.category

		for (let i = 0; i < arrayCategory.length; i++) {
			const isCategoryExist = await this.categoryService.findById(arrayCategory[i])
			if (! isCategoryExist) {
				throw new BadRequestException()
			}
		}

		return await createFulfillment.save();
	}

	async findAll(options: Query): Promise<IFulfillment[]> {
		const offset = (options.offset == 0 ? options.offset : (options.offset - 1));
		const skip = offset * options.limit;
		const sortval = (options.sortval == 'asc') ? 1 : -1;

		if (options.sortby){
			if (options.fields) {

				return await this.fulfillmentModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.populate('category')
					.populate('product')

			} else {

				return await this.fulfillmentModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.populate('category')
					.populate('product')

			}
		}else{
			if (options.fields) {

				return await this.fulfillmentModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.populate('category')
					.populate('product')

			} else {

				return await this.fulfillmentModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.populate('category')
					.populate('product')

			}
		}
	}

	async findById(id: string): Promise<IFulfillment> {
	 	let result;
		try{
		    result = await this.fulfillmentModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find fulfillment with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find fulfillment with id ${id}`);
		}

		return result;
	}

	async update(id: string, updateFulfillmentDto: UpdateFulfillmentDTO): Promise<IFulfillment> {
		let result;
		
		// Check ID
		try{
		    result = await this.fulfillmentModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find fulfillment with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find fulfillment with id ${id}`);
		}

		await this.fulfillmentModel.findByIdAndUpdate(id, updateFulfillmentDto);
		return await this.fulfillmentModel.findById(id).exec();
	}

	async delete(id: string): Promise<string> {
		try{
			await this.fulfillmentModel.findByIdAndRemove(id).exec();
			return 'ok';
		}catch(err){
			throw new NotImplementedException('The fulfillment could not be deleted');
		}
	}
}
