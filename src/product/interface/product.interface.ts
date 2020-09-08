import { Document } from 'mongoose';

export interface IProduct extends Document {
     type: string;
     name: string;
     slug: string;
     short_desc: string;
     description: string;
     time_period: string;
     price: number;
     created_by: string;
     updated_by: string;
}