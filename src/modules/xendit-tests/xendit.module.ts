import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { XenditController } from './xendit.controller';
import { XenditService } from './xendit.service';

@Module({
  imports: [
		MongooseModule.forFeature(),
		// AuthModule
	],
  controllers: [XenditController],
  providers: [XenditService]
})
export class XenditModule {}
