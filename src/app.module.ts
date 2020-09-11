import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Connection } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { TopicModule } from './topic/topic.module';
import { MediaModule } from './media/media.module';

@Module({
	imports: [
        Connection,
	    AuthModule,
	    UserModule,
	    ProductModule,
	    OrderModule,
	    TopicModule,
	    MediaModule
	],
	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
