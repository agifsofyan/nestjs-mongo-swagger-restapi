import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

const { 
	DB_USER, 
	DB_PASS, 
	DB_HOST, 
	BACKOFFICE_API_PORT, 
	DB_NAME, 
	DB_AUTH,
	JWT_SECRET,
	JWT_EXPIRATION,
	JWT_ENCRYPT_SECRETKEY
} = process.env;

const uri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${BACKOFFICE_API_PORT}/${DB_NAME}?authSource=${DB_AUTH}`;
// const uri = `mongodb://laruno:password@localhost:27017/laruno_db?authSource=admin`;

// DB_HOST=localhost
// DB_PORT=27017
// DB_NAME=laruno_db
// DB_USER=laruno
// DB_PASS=password
// DB_AUTH=admin

export const Connection = MongooseModule.forRoot(uri, {
	useNewUrlParser: true,
	bufferCommands: false,
	bufferMaxEntries: 0,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

export const JWT_SECRET_KEY = `${JWT_SECRET}`;
export const JWT_ENCRYPT_SECRET_KEY = `${JWT_ENCRYPT_SECRETKEY}`;
export const JWT_EXPIRATION_TIME = `${JWT_EXPIRATION}`;
