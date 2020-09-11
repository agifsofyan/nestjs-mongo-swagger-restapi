import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schema/product.schema';

import { TopicModule } from '../topic/topic.module';
import { TopicService } from '../topic/topic.service';
import { TopicController } from '../topic/topic.controller';
import { TopicSchema } from '../topic/schema/topic.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Product', schema: ProductSchema },
			{ name: 'Topic', schema: TopicSchema }
		]),
		AuthModule,
		TopicModule
	],
	controllers: [ProductController],
  	providers: [ProductService, TopicService]
})
export class ProductModule {}
