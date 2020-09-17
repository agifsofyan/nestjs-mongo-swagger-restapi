import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TopicSchema } from './schema/topic.schema';

@Module({
  imports: [
		MongooseModule.forFeature([{ name: 'Topic', schema: TopicSchema }]),
		AuthModule
	],
  controllers: [TopicController],
  providers: [TopicService]
})
export class TopicModule {}
