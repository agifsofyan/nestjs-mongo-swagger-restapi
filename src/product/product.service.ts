import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product as IProduct } from './interface/product.interface';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {

	constructor(@InjectModel('Product') private readonly productModel: Model<IProduct>) {}

	async create(productDto: ProductDto): Promise<IProduct> {
		const createProduct = new this.productModel(productDto);
		return await createProduct.save();
	}

	async findAll(): Promise<IProduct[]> {
		return await this.productModel.find().exec();
	}

	async findById(id: string): Promise<IProduct> {
	 	let result;
		try{
		    result = await this.productModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find product with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find product with id ${id}`);
		}

		return result;
	}

	async findOne(options: object): Promise<IProduct> {
		const product = await this.productModel.findOne(options).exec();

		if(!product){
			throw new NotFoundException(`Could nod find product with your condition`);
		}

		return product;
	}

	async update(id: string, newProduct: ProductDto): Promise<IProduct> {
		let result;
		try{
		    result = await this.productModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find product with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find product with id ${id}`);
		}

		await this.productModel.findByIdAndUpdate(id, newProduct).exec();
		return await this.productModel.findById(id).exec();
	}

	async delete(id: string): Promise<string> {
		try{
			await this.productModel.findByIdAndRemove(id).exec();
			return 'ok';
		}catch(err){
			throw new NotImplementedException('The product could not be deleted');
		}
	}
}
