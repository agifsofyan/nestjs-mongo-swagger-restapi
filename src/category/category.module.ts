import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategorySchema } from './schema/category.schema';

@Module({
  imports: [
		MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
		AuthModule
	],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
