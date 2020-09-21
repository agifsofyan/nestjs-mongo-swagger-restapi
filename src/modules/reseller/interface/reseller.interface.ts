import { Document } from 'mongoose';

export interface IReseller extends Document {
     content: string;
     images: [string]
}