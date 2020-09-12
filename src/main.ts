import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// import { NestFastifyApplication } from '@nestjs/platform-fastify';
// import { FastifyAdapterConf } from './config/multer.configuration';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });

	// const app: INestApplication = await NestFactory.create<NestFastifyApplication>(
    //     AppModule,
    //     // FastifyAdapterConf,
    // );
    app.enableCors();

	// app.enableCors({
	// 	origin: "*",
	// 	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	// 	allowedHeaders: "Content-Type, Accept",
	// });

	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('/api/v1')

	const options = new DocumentBuilder()
		.setTitle('laruno-backoffice-api-v1')
		.setDescription(`API ${process.env.NODE_ENV}.`)
		.setVersion('1.0')
		.addTag('API')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api/v1/docs', app, document);

	const PORT = process.env.BACKOFFICE_API_PORT || 3000;

	await app.listen(PORT);

	console.log(`[API] laruno-backoffice-api started running in ${process.env.NODE_ENV} mode on port ${PORT}.`);
}
bootstrap();
