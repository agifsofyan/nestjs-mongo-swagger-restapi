import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

const { 
	DB_USER, 
	DB_PASS, 
	DB_HOST, 
	DB_PORT, 
	DB_NAME, 
	DB_AUTH,
} = process.env;

const uri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTH}`;

export const Connection = MongooseModule.forRoot(uri, {
	useNewUrlParser: true,
	bufferCommands: false,
	bufferMaxEntries: 0,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

export const jwtSecret = process.env.JWT_SECRET

export const jwtExp = `${process.env.JWT_EXPIRED}d` //in days