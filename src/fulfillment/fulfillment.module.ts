import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { FulfillmentController } from './fulfillment.controller';
import { FulfillmentService } from './fulfillment.service';
import { FulfillmentSchema } from './schema/fulfillment.schema';

import { TopicModule } from '../topic/topic.module';
import { TopicService } from '../topic/topic.service';
import { TopicSchema } from '../topic/schema/topic.schema';

import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { ProductSchema } from '../product/schema/product.schema';

@Module({
  imports: [
		MongooseModule.forFeature([
      { name: 'Fulfillment', schema: FulfillmentSchema },
      { name: 'Topic', schema: TopicSchema },
      { name: 'Product', schema: ProductSchema }
    ]),
    AuthModule,
    TopicModule,
    ProductModule
	],
  controllers: [FulfillmentController],
  providers: [FulfillmentService, TopicService, ProductService]
})
export class FulfillmentModule {}
