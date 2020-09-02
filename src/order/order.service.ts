import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IOrder } from './interface/order.interface';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {

	constructor(@InjectModel('Order') private readonly orderModel: Model<IOrder>) {}

	async create(orderDto: OrderDto): Promise<IOrder> {
		const createOrder = new this.orderModel(orderDto);
		return await createOrder.save();
	}

	async findAll(): Promise<IOrder[]> {
		return await this.orderModel.find().exec();
	}

	async findById(id: string): Promise<IOrder> {
	 	let result;
		try{
		    result = await this.orderModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find Order with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find Order with id ${id}`);
		}

		return result;
	}

	async findOne(options: object): Promise<IOrder> {
		const Order = await this.orderModel.findOne(options).exec();

		if(!Order){
			throw new NotFoundException(`Could nod find Order with your condition`);
		}

		return Order;
	}

	async update(id: string, newOrder: OrderDto): Promise<IOrder> {
		let result;
		try{
		    result = await this.orderModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find Order with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find Order with id ${id}`);
		}

		await this.orderModel.findByIdAndUpdate(id, newOrder).exec();
		return await this.orderModel.findById(id).exec();
	}

	async delete(id: string): Promise<string> {
		try{
			await this.orderModel.findByIdAndRemove(id).exec();
			return 'ok';
		}catch(err){
			throw new NotImplementedException('The Order could not be deleted');
		}
	}
}
