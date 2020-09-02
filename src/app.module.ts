import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Connection } from './config/configuration';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
=======
import { UserModule } from './user/user.module';
>>>>>>> 5d23c2cd5742178ed1f14b82cdb0c82b781f752c

@Module({
	imports: [
		Connection,
	    AuthModule,
<<<<<<< HEAD
	    UsersModule,
	    OrderModule,
=======
		UserModule,
	    ProductModule
>>>>>>> 5d23c2cd5742178ed1f14b82cdb0c82b781f752c
	],
	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
