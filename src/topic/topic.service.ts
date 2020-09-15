import { 
	Injectable, 
	NotFoundException, 
	BadRequestException,
	NotImplementedException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ITopic } from './interface/topic.interface';
import { CreateTopicDTO, UpdateTopicDTO } from './dto/topic.dto';
import { Query } from '../utils/OptQuery';

@Injectable()
export class TopicService {

	constructor(@InjectModel('Topic') private readonly topicModel: Model<ITopic>) {}

	async create(createTopicDto: CreateTopicDTO): Promise<ITopic> {
		const createTopic = new this.topicModel(createTopicDto);

		// Check if topic name is already exist
        const isTopicNameExist = await this.topicModel.findOne({ name: createTopic.name });
        	
		if (isTopicNameExist) {
        	throw new BadRequestException('That topic name (slug) is already exist.');
		}

		return await createTopic.save();
	}

	async findAll(options: Query): Promise<ITopic[]> {
		const offset = (options.offset == 0 ? options.offset : (options.offset - 1));
		const skip = offset * options.limit;
		const sortval = (options.sortval == 'asc') ? 1 : -1;

		if (options.sortby){
			if (options.fields) {

				return await this.topicModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.exec();

			} else {

				return await this.topicModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.exec();

			}
		}else{
			if (options.fields) {

				return await this.topicModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.exec();

			} else {

				return await this.topicModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ 'updated_at': 'desc' })
					.exec();

			}
		}
	}

	async findById(id: string): Promise<ITopic> {
	 	let result;
		try{
		    result = await this.topicModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find topic with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find topic with id ${id}`);
		}

		return result;
	}

	async update(id: string, updateTopicDto: UpdateTopicDTO): Promise<ITopic> {
		let result;
		
		// Check ID
		try{
		    result = await this.topicModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find topic with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find topic with id ${id}`);
		}

		await this.topicModel.findByIdAndUpdate(id, updateTopicDto);
		return await this.topicModel.findById(id).exec();
	}

	async delete(id: string): Promise<string> {
		try{
			await this.topicModel.findByIdAndRemove(id).exec();
			return 'ok';
		}catch(err){
			throw new NotImplementedException('The topic could not be deleted');
		}
	}
}
