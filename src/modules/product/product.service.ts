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
import { ReverseString, RandomStr, Slugify, StrToUnix, UnixToStr } from 'src/utils/StringManipulation';
import { TimeValidation } from 'src/utils/CustomValidation';

@Injectable()
export class ProductService {

	constructor(
		@InjectModel('Product') private readonly productModel: Model<IProduct>,
		private readonly topicService: TopicService
	) {}

	async create(createProductDto: CreateProductDTO): Promise<IProduct> {
		const result = new this.productModel(createProductDto)

		const { 
			name,
			duration,
			start_time,
			client_url, 
			date,
			feature_onheader,
			feature_onpage,
			product_redirect,
			topic,
			agent,
			slug
		} = createProductDto
				
		/** Product Slug Start */
		if(slug){
			const makeSlug = Slugify(slug)
			const isSlugExist = await this.productModel.findOne({ slug: makeSlug })
			console.log("isSlugExist", isSlugExist)
			if (isSlugExist) {
				throw new BadRequestException('That product slug is already exist.')
			}
			result.slug = makeSlug
		}else{
			throw new BadRequestException('Slug is required.')
		}
		/** Product Slug End */
		
		// Check Topic ID
		var arrayTopic = topic
		for (let i = 0; i < arrayTopic.length; i++) {
			const topicFound = await this.topicService.findById(arrayTopic[i])
			console.log("topicFound", topicFound)
			if (!topicFound) {
				throw new BadRequestException('Topic Id not found')
			}
		}

		// Check Product_Redirect ID
		const productFound = await this.productModel.findOne({ id: product_redirect })
		console.log("productFound", productFound)
		if (!productFound) {
			throw new BadRequestException('Product Id as product_redirect not found')
		}
		

		// Check Agent (User) ID
		var arrayAgent = agent
		for (let i = 0; i < arrayAgent.length; i++) {
			const agentFound = await this.productModel.findById(arrayAgent[i])
			console.log("agentFound", agentFound)
			if (!agentFound) {
				throw new BadRequestException('Agent Id not found')
			}
		}
		
		/** Product Code Start */
		var makeCode = ReverseString(name) // to convert Product Code
		
		const isCodeExists = await this.productModel.findOne({ code: makeCode })

		if(isCodeExists){
			result.code = makeCode+RandomStr()
		}
		result.code = makeCode
		/** Product Code End */

		/** Webinar Start */
		if (date) {
			result.webinar.date = date;
		}

		if(start_time && duration){

			const startTimeFormat = TimeValidation(start_time)

			if(!startTimeFormat) {
				throw new BadRequestException('Time field not valid, ex: 09:59')
			}
			
			result.webinar.start_time = start_time;
			var startTimeUnix = StrToUnix(start_time)

			const durationFormat = TimeValidation(duration)

			if(!durationFormat) {
				throw new BadRequestException('Duration field not valid, ex: 09:59')
			}
			
			result.webinar.duration = duration;
			var durationUnix = StrToUnix(duration)

			var endTimeUnix = startTimeUnix + durationUnix
			console.log("endTimeUnix", endTimeUnix)

			var endTimeFormat = UnixToStr(endTimeUnix)

			result.webinar.end_time = endTimeFormat
		}

		if (client_url) {
			result.webinar.client_url = client_url;
		}
		/** Webinar End */

		/** Feature Start */
		if(feature_onpage){
			result.feature.feature_onpage = feature_onpage;
		}
		
		if(feature_onheader){
			result.feature.feature_onheader = feature_onheader;
		}
		/** Feature End */

		return await result.save()
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
					.populate('agent', ['_id', 'name', 'email'])

			} else {

				return await this.productModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortvals })
					.populate('topic', ['_id', 'name', 'slug'])
					.populate('product_redirect', ['_id', 'name', 'slug', 'type', 'code', 'visibility'])
					.populate('agent', ['_id', 'name', 'email'])

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
					.populate('agent', ['_id', 'name', 'email'])

			} else {

				return await this.productModel
					.find(filter)
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.populate('topic', ['_id', 'name', 'slug'])
					.populate('product_redirect', ['_id', 'name', 'slug', 'type', 'code', 'visibility'])
					.populate('agent', ['_id', 'name', 'email'])
			}
		}
	}

	async findById(id: string): Promise<IProduct> {
	 	let result
		try{
			result = await this.productModel.findById(id)
				.populate('topic', ['_id', 'name', 'slug'])
				.populate('product_redirect', ['_id', 'name', 'slug', 'type', 'code', 'visibility'])
				.populate('agent', ['_id', 'name', 'email'])
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
			date,
			duration,
			start_time,
			client_url,
			feature_onheader,
			feature_onpage,
			product_redirect,
			topic,
			agent,
			slug
		} = updateProductDto

		/** Product Slug Start */
		if(name){
			if(slug){
				const makeSlug = Slugify(slug)
				const isSlugExist = await this.productModel.findOne({ slug: makeSlug })
					
				if (isSlugExist) {
					throw new BadRequestException('That product slug is already exist.')
				}
				result.slug = makeSlug
			}else{
				throw new BadRequestException('Name and Slug is required together')
			}
			/** Product Slug End */
		}

		
		// Check Topic ID
		if(topic){
			var arrayTopic = topic
			for (let i = 0; i < arrayTopic.length; i++) {
				const topicFound = await this.topicService.findById(arrayTopic[i])
				console.log("topicFound", topicFound)
				if (!topicFound) {
					throw new BadRequestException('Topic Id not found')
				}
			}
		}

		// Check Product_Redirect ID
		if(product_redirect){
			const productFound = await this.productModel.findOne({ id: product_redirect })
			console.log("productFound", productFound)
			if (!productFound) {
				throw new BadRequestException('Product Id as product_redirect not found')
			}
		}

		// Check Agent (User) ID
		if(agent){
			var arrayAgent = agent
			for (let i = 0; i < arrayAgent.length; i++) {
				const agentFound = await this.productModel.findById(arrayAgent[i])
				console.log("agentFound", agentFound)
				if (!agentFound) {
					throw new BadRequestException('Agent Id not found')
				}
			}
		}

		/** Webinar Start */
		if (date) {
			result.webinar.date = date;
		}

		if(start_time && duration){

			const startTimeFormat = TimeValidation(start_time)

			if(!startTimeFormat) {
				throw new BadRequestException('Time field not valid, ex: 09:59')
			}
			
			result.webinar.start_time = start_time;
			var startTimeUnix = StrToUnix(start_time)

			const durationFormat = TimeValidation(duration)

			if(!durationFormat) {
				throw new BadRequestException('Duration field not valid, ex: 09:59')
			}
			
			result.webinar.duration = duration;
			var durationUnix = StrToUnix(duration)

			var endTimeUnix = startTimeUnix + durationUnix
			console.log("endTimeUnix", endTimeUnix)
			
			var endTimeFormat = UnixToStr(endTimeUnix)

			result.webinar.end_time = endTimeFormat
		}

		if (client_url) {
			result.webinar.client_url = client_url;
		}
		/** Webinar End */

		/** Feature Start */
		if(feature_onpage){
			result.feature.feature_onpage = feature_onpage;
		}
		
		if(feature_onheader){
			result.feature.feature_onheader = feature_onheader;
		}
		/** Feature End */

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
