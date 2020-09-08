import { 
	Injectable, 
	NotFoundException, 
	BadRequestException,
	NotImplementedException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProduct } from './interface/product.interface';
import { ProductDto } from './dto/product.dto';
import { Query } from '../utils/OptQuery';

@Injectable()
export class ProductService {

	constructor(@InjectModel('Product') private readonly productModel: Model<IProduct>) {}

	async create(productDto: ProductDto): Promise<IProduct> {
		const createProduct = new this.productModel(productDto);

		// Check if product name is already exist
        const isProductNameExist = await this.productModel.findOne({ name: createProduct.name });
        	
		if (isProductNameExist) {
        	throw new BadRequestException('That product name (slug) is already exist.');
        }

		return await createProduct.save();
	}

	async findAll(options: Query): Promise<IProduct[]> {
		const offset = (options.offset == 0 ? options.offset : (options.offset - 1));
		const skip = offset * options.limit;
		const sortval = (options.sortval == 'asc') ? 1 : -1;

		if (options.sortby){
			if (options.fields) {

				return await this.productModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.exec();

			} else {

				return await this.productModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.sort({ [options.sortby]: sortval })
					.exec();

			}
		}else{
			if (options.fields) {

				return await this.productModel
					.find({ $where: `/^${options.value}.*/.test(this.${options.fields})` })
					.skip(Number(skip))
					.limit(Number(options.limit))
					.exec();

			} else {

				return await this.productModel
					.find()
					.skip(Number(skip))
					.limit(Number(options.limit))
					.exec();

			}
		}
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

	async update(id: string, NewProduct: Partial<ProductDto>): Promise<IProduct> {
		let result;
		
		// Check ID
		try{
		    result = await this.productModel.findById(id);
		}catch(error){
		    throw new NotFoundException(`Could nod find product with id ${id}`);
		}

		if(!result){
			throw new NotFoundException(`Could nod find product with id ${id}`);
		}

		await this.productModel.findByIdAndUpdate(id, NewProduct);
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
