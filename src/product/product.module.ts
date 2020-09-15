import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schema/product.schema';

import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { CategorySchema } from '../category/schema/category.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Product', schema: ProductSchema },
			{ name: 'Category', schema: CategorySchema }
		]),
		AuthModule,
		CategoryModule
	],
	controllers: [ProductController],
  	providers: [ProductService, CategoryService]
})
export class ProductModule {}
