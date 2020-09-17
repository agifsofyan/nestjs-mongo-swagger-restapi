import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { UserSchema } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ]),
  ],
  controllers: [SellerController],
  providers: [SellerService, UserService]
})
export class SellerModule {}
