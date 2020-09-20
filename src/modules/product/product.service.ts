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
import { TopicService } from '../topic/topic.service';
import { Query } from 'src/utils/OptQuery';
import { ReverseString, RandomStr } from 'src/utils/StringManipulation';
import { TimeValidation } from 'src/utils/CustomValidation';

@Injectable()
export class ProductService {

	constructor(
		@InjectModel('Product') private readonly productModel: Model<IProduct>,
		private readonly topicService: TopicService
	) {}

	async create(createProductDto: CreateProductDTO): Promise<IProduct> {
		const product = new this.productModel(createProductDto)

		const { 
			name,
			start_time, 
			end_time, 
			client_url, 
			date,
			feature_onheader,
			feature_onpage,
			product_redirect
		} = createProductDto
				
		// Check if product name is already exist
		const isProductSlugExist = await this.productModel.findOne({ slug: product.slug })
        	
		if (isProductSlugExist) {
        	throw new BadRequestException('That product slug is already exist.')
		}

		var arrayTopic = createProductDto.topic

		console.log('arrayTopic:', arrayTopic)

		for (let i = 0; i < arrayTopic.length; i++) {
			const topicFound = await this.topicService.findById(arrayTopic[i])
			if (!topicFound) {
				throw new BadRequestException('Topic Id not found')
			}
		}

		const productFound = await this.productModel.findById(product_redirect)
		if (!productFound) {
			throw new BadRequestException('Product Id not found')
		}
		
		// create Product Code
		var makeCode = ReverseString(name) // to convert Product Code
		
		const isCodeExists = await this.productModel.findOne({ code: makeCode })

		if(isCodeExists){
			product.code = makeCode+RandomStr()
		}

		product.code = makeCode

		//if(start_time){

		//	const checkStartTime = TimeValidation(start_time)
		//	const checkEndTime = TimeValidation(end_time)

		//	if(!checkStartTime) {
		//		throw new BadRequestException('Start time field not valid, ex: 09:59')
		//	}

		//	if(!checkEndTime){
		//		throw new BadRequestException('End time field not valid, ex: 10:59')
		//	}
		//}

		if (date !== undefined || date !== '') {
			product.webinar.date = date;
			product.webinar.start_time = start_time;
			product.webinar.end_time = end_time;
			product.webinar.client_url = client_url;
		}

		if(feature_onpage !== '' || feature_onheader !== ''){
			product.feature.feature_onpage = feature_onpage;
			product.feature.feature_onheader = feature_onheader;
		}

		return await product.save()
	}

	async findAll(options: Query): Promise<IProduct[]> {
		const { 
			offset, 
			limit, 
			sortby, 
			sortval, 
			fields, 
			value, 
			optFields, 
			optVal 
		} = options;

		const offsets = (offset == 0 ? offset : (offset - 1))
		const skip = offsets * limit
		const sortvals = (sortval == 'asc') ? 1 : -1

		var filter: object = { [fields]: value  }

		if(optFields){
			if(!fields){
				filter = { [optFields]: optVal }
			}
			filter = { [fields]: value, [optFields]: optVal }
		}

		if (sortby){
			if (fields) {

				return await this.productModel
					.find(filter)
					.skip(Number(skip))
					.limit(Number(limit))
					.sort({ [sortby]: sortvals })
					.populate('topic', ['_id', 'name', 'slug'])
					.populate('product_redirect', ['_id', 'name', 'slug', 'type', 'code', 'visibility'])

			} else {

				return await this.productModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortvals })
					.populate('topic', ['_id', 'name', 'slug'])
					.populate('product_redirect', ['_id', 'name', 'slug', 'type', 'code', 'visibility'])

			}
		}else{
			if (options.fields) {

				return await this.productModel
					.find(filter)
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.populate('topic', ['_id', 'name', 'slug'])
					.populate('product_redirect', ['_id', 'name', 'slug', 'type', 'code', 'visibility'])

			} else {

				return await this.productModel
					.find(filter)
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.populate('topic', ['_id', 'name', 'slug'])
					.populate('product_redirect', ['_id', 'name', 'slug', 'type', 'code', 'visibility'])
			}
		}
	}

	async findById(id: string): Promise<IProduct> {
	 	let result
		try{
			result = await this.productModel.findById(id)
				.populate('topic', ['_id', 'name', 'slug'])
				.populate('product_redirect', ['_id', 'name', 'slug', 'type', 'code', 'visibility'])
		}catch(error){
		    throw new NotFoundException(`Could nod find product with id ${id}`)
		}

		if(!result){
			throw new NotFoundException(`Could nod find product with id ${id}`)
		}

		return result
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
		 
		const {
			name,
			start_time,
			end_time,
			client_url,
			date,
			feature_onheader,
			feature_onpage,
			product_redirect
		} = updateProductDto

		// Check if product name is already exist
		const isProductSlugExist = await this.productModel.findOne({ slug: result.slug })

		if (isProductSlugExist) {
			throw new BadRequestException('That product slug is already exist.')
		}

		var arrayTopic = updateProductDto.topic

		console.log('arrayTopic:', arrayTopic)

		for (let i = 0; i < arrayTopic.length; i++) {
			const topicFound = await this.topicService.findById(arrayTopic[i])
			if (!topicFound) {
				throw new BadRequestException('Topic Id not found')
			}
		}

		const productFound = await this.productModel.findById(product_redirect)
		if (!productFound) {
			throw new BadRequestException('Product Id not found')
		}

		// create Product Code
		var makeCode = ReverseString(name) // to convert Product Code

		const isCodeExists = await this.productModel.findOne({ code: makeCode })

		if (isCodeExists) {
			result.code = makeCode + RandomStr()
		}

		result.code = makeCode

		if (date !== undefined || date !== '') {
			result.webinar.date = date;
			result.webinar.start_time = start_time;
			result.webinar.end_time = end_time;
			result.webinar.client_url = client_url;
		}

		if(feature_onheader !== '' || feature_onpage !== ''){
			result.feature.feature_onheader = feature_onheader;
			result.feature.feature_onpage = feature_onpage;
		}

		await this.productModel.findByIdAndUpdate(id, updateProductDto);
		return await this.productModel.findById(id).populate('topic')
	}

	async delete(id: string): Promise<string> {
		try{
			await this.productModel.findByIdAndRemove(id).exec();
			return 'ok'
		}catch(err){
			throw new NotImplementedException('The product could not be deleted')
		}
	}

	async search(value: string): Promise<IProduct[]> {
		const product = await this.productModel.find({"type": {$regex: ".*" + value + ".*"}})

		if(!product){
			throw new NotFoundException(`Could nod find product with your condition`)
		}

		return product
	}
}
