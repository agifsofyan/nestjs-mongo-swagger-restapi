import { Document } from 'mongoose';
// import { ITopic } from '../../product/interface/product.interface';

export interface IProduct extends Document {
     type: string;
     name: string;
     slug: string;
     visibility: string;
     upsale: string;
     // readonly topic: IProduct;
     short_desc: string;
     description: string;
     time_period: string;
     price: string; 
     created_by: string;
     updated_by: string;
}