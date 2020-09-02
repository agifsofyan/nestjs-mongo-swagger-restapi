import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Connection } from './config/configuration';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		Connection,
	    AuthModule,
	    OrderModule,
	    UserModule,
	    ProductModule
	],
	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
