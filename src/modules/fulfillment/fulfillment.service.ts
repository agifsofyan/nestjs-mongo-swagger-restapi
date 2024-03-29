import { 
	Injectable, 
	NotFoundException, 
	BadRequestException,
	NotImplementedException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IFulfillment } from './interface/fulfillment.interface';
import { 
	CreateFulfillmentDTO, 
	UpdateFulfillmentDTO, 
	DeleteManyDTO,
	SearchDTO
} from './dto/fulfillment.dto';
import { Query } from 'src/utils/OptQuery';

import { TopicService } from '../topic/topic.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class FulfillmentService {

	constructor(
		@InjectModel('Fulfillment') private readonly fulfillmentModel: Model<IFulfillment>,
		private readonly topicService: TopicService,
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

		var arrayTopic = createFulfillmentDto.topic

		for (let i = 0; i < arrayTopic.length; i++) {
			const isTopicExist = await this.topicService.findById(arrayTopic[i])
			if (! isTopicExist) {
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
					.populate('topic')
					.populate('product')

			} else {

				return await this.fulfillmentModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.populate('topic')
					.populate('product')

			}
		}else{
			if (options.fields) {

				return await this.fulfillmentModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.populate('topic')
					.populate('product')

			} else {

				return await this.fulfillmentModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.populate('topic')
					.populate('product')

			}
		}
	}

	async findById(id: string): Promise<IFulfillment> {
	 	let data;
		try{
		    data = await this.fulfillmentModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find fulfillment with id ${id}`);
		}

		if(!data){
			throw new NotFoundException(`Could nod find fulfillment with id ${id}`);
		}

		return data;
	}

	async update(id: string, updateFulfillmentDto: UpdateFulfillmentDTO): Promise<IFulfillment> {
		let data;
		
		// Check ID
		try{
		    data = await this.fulfillmentModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find fulfillment with id ${id}`);
		}

		if(!data){
			throw new NotFoundException(`Could nod find fulfillment with id ${id}`);
		}

		var arrayProduct = updateFulfillmentDto.product

		for (let i = 0; i < arrayProduct.length; i++) {
			const isProductExist = await this.productService.findById(arrayProduct[i])
			if (! isProductExist) {
				throw new BadRequestException()
			}
		}
		
		var arrayTopic = updateFulfillmentDto.topic

		for (let i = 0; i < arrayTopic.length; i++) {
			const isTopicExist = await this.topicService.findById(arrayTopic[i])
			if (! isTopicExist) {
				throw new BadRequestException()
			}
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

	async deleteMany(arrayId: DeleteManyDTO): Promise<string> {
		try {
			await this.fulfillmentModel.deleteMany({ _id: { $in: arrayId.id } });
			return 'ok';
		} catch (err) {
			throw new NotImplementedException('The fulfillment could not be deleted');
		}
	}

	async search(value: SearchDTO): Promise<IFulfillment[]> {
		const result = await this.fulfillmentModel.find({
			$or: [
				{ name: {$regex: ".*" + value.search + ".*", $options: "i"} },
				{ content: {$regex: ".*" + value.search + ".*", $options: "i"} }
			]
		})

		if (!result) {
			throw new NotFoundException("Your search was not found")
		}

		return result
	}
}
