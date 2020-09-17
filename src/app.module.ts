import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Connection } from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { MediaModule } from './modules/media/media.module';
import { FulfillmentModule } from './modules/fulfillment/fulfillment.module';
import { TopicModule } from './modules/topic/topic.module';
import { RoleModule } from './modules/role/role.module';

@Module({
	imports: [
		Connection,
	    AuthModule,
	    UserModule,
	    ProductModule,
		TopicModule,
		FulfillmentModule,
		MediaModule,
		RoleModule
	],
	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
