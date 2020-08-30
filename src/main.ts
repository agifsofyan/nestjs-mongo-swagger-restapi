import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('/api/v1')

	const options = new DocumentBuilder()
		.setTitle('laruno-backend-api[backoffice]-v1')
		.setDescription(`RestAPI Laruno to Backoffice in mode: ${process.env.API_ENV}.`)
		.setVersion('1.0')
		.addTag('API')
		.build();

	const document = SwaggerModule.createDocument(app, options, {
		include: [
			AppModule
		]
	});
	SwaggerModule.setup('api', app, document);

	const PORT = process.env.PORT || 3000;

	await app.listen(PORT);

	console.log(`[API] laruno-backend-api[backoffice] started running in ${process.env.API_ENV} mode on port ${PORT}.`);
}
bootstrap();
