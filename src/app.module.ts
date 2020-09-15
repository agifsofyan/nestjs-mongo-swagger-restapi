import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Connection } from './config/configuration';
// import { RoleModule } from './role.old/role.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { MediaModule } from './media/media.module';
import { FulfillmentModule } from './fulfillment/fulfillment.module';
import { TopicModule } from './topic/topic.module';

@Module({
	imports: [
		Connection,
		// RoleModule,
	    AuthModule,
	    UserModule,
	    ProductModule,
	    OrderModule,
		TopicModule,
		FulfillmentModule,
	    MediaModule,
	],
	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
