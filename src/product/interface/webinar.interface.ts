import { Document } from 'mongoose';

export interface IWebinar extends Document {
	date: string;
	start_time: string;
	end_time: string;
	client_url: string;
}

