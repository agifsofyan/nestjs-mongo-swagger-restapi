import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { ResellerController } from './reseller.controller';
import { ResellerService } from './reseller.service';
import { ResellerSchema } from './schema/reseller.schema';

@Module({
  imports: [
		MongooseModule.forFeature([{ name: 'Reseller', schema: ResellerSchema }]),
		AuthModule
	],
  controllers: [ResellerController],
  providers: [ResellerService]
})
export class ResellerModule {}
