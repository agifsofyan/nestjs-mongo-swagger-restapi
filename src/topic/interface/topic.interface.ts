import { Document } from 'mongoose';

export interface ITopic extends Document {
     name: string;
     slug: string;
}