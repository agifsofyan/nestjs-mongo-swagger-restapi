import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { FulfillmentController } from './fulfillment.controller';
import { FulfillmentService } from './fulfillment.service';
import { FulfillmentSchema } from './schema/fulfillment.schema';

import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { CategorySchema } from '../category/schema/category.schema';

import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { ProductSchema } from '../product/schema/product.schema';

@Module({
  imports: [
		MongooseModule.forFeature([
      { name: 'Fulfillment', schema: FulfillmentSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Product', schema: ProductSchema }
    ]),
    AuthModule,
    CategoryModule,
    ProductModule
	],
  controllers: [FulfillmentController],
  providers: [FulfillmentService, CategoryService, ProductService]
})
export class FulfillmentModule {}
