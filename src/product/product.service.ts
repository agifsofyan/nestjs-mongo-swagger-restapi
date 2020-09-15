import { 
	Injectable, 
	NotFoundException, 
	BadRequestException,
	NotImplementedException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProduct } from './interface/product.interface';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { CategoryService } from '../category/category.service';
import { Query } from '../utils/OptQuery';
import { ReverseString } from '../utils/StringManipulation';
import { TimeValidation } from '../utils/CustomValidation';

@Injectable()
export class ProductService {

	constructor(
		@InjectModel('Product') private readonly productModel: Model<IProduct>,
		private readonly categoryService: CategoryService
	) {}

	async create(createProductDto: CreateProductDTO): Promise<IProduct> {
		const product = new this.productModel(createProductDto)

		const { name, date, start_time, end_time, client_url } = createProductDto
				
		// Check if product name is already exist
		const isProductSlugExist = await this.productModel.findOne({ slug: product.slug })
        	
		if (isProductSlugExist) {
        	throw new BadRequestException('That product slug is already exist.')
		}

		var arrayCategory = createProductDto.topic

		console.log('arrayCategory:', arrayCategory)

		for (let i = 0; i < arrayCategory.length; i++) {
			const isCategoryExist = await this.categoryService.findById(arrayCategory[i])
			if (! isCategoryExist) {
				throw new BadRequestException()
			}
		}
		
		// create Product Code
		var makeCode = ReverseString(name) // to convert Product Code

		product.code = makeCode

		if(start_time){

			const checkStartTime = TimeValidation(start_time)
			const checkEndTime = TimeValidation(end_time)

			if(!checkStartTime) {
				throw new BadRequestException('Start time field not valid, ex: 09:59')
			}

			if(!checkEndTime){
				throw new BadRequestException('End time field not valid, ex: 10:59')
			}
		}

		if (date !== undefined || date !== '') {
			product.webinar.date = date;
			product.webinar.start_time = start_time;
			product.webinar.end_time = end_time;
			product.webinar.client_url = client_url;
		}

		return await product.save()
	}

	async findAll(options: Query): Promise<IProduct[]> {
		const offset = (options.offset == 0 ? options.offset : (options.offset - 1))
		const skip = offset * options.limit
		const sortval = (options.sortval == 'asc') ? 1 : -1

		if (options.sortby){
			if (options.fields) {

				return await this.productModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.populate('topic')

			} else {

				return await this.productModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.populate('topic')

			}
		}else{
			if (options.fields) {

				return await this.productModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.populate('topic')

			} else {

				return await this.productModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.populate('topic')
			}
		}
	}

	async findById(id: string): Promise<IProduct> {
	 	let result
		try{
			result = await this.productModel.findById(id).populate('category')
		}catch(error){
		    throw new NotFoundException(`Could nod find product with id ${id}`)
		}

		if(!result){
			throw new NotFoundException(`Could nod find product with id ${id}`)
		}

		return result
	}

	async findOne(options: object): Promise<IProduct> {
		const product = await this.productModel.findOne(options).populate('category')

		if(!product){
			throw new NotFoundException(`Could nod find product with your condition`)
		}

		return product
	}

	async update(id: string, updateProductDto: UpdateProductDTO): Promise<IProduct> {
		let result;
		
		// Check ID
		try{
			result = await this.productModel.findById(id).exec()
		}catch(error){
		    throw new NotFoundException(`Could nod find product with id ${id}`);
		}

	 	if(!result){
	 		throw new NotFoundException(`Could nod find product with id ${id}`);
		}
		 
		const { name, date, start_time, end_time, client_url } = updateProductDto
				
		// Check if product name is already exist
		
		// create Product Code
		var makeCode = ReverseString(name) // to convert Product Code

		result.code = makeCode

		if(start_time){

			const checkStartTime = TimeValidation(start_time)
			const checkEndTime = TimeValidation(end_time)

			if(!checkStartTime) {
				throw new BadRequestException('Start time field not valid, ex: 09:59')
			}

			if(!checkEndTime){
				throw new BadRequestException('End time field not valid, ex: 10:59')
			}
		}

		if (date !== undefined || date !== '') {
			result.webinar.date = date;
			result.webinar.start_time = start_time;
			result.webinar.end_time = end_time;
			result.webinar.client_url = client_url;
		}

		await this.productModel.findByIdAndUpdate(id, updateProductDto);
		return await this.productModel.findById(id).populate('category')
	}

	async delete(id: string): Promise<string> {
		try{
			await this.productModel.findByIdAndRemove(id).exec();
			return 'ok'
		}catch(err){
			throw new NotImplementedException('The product could not be deleted')
		}
	}
}
