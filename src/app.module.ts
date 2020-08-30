import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Connection } from './config/configuration';
import { ProductModule } from './product/product.module';

@Module({
	imports: [
		Connection,
	    ProductModule,
	],
	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
