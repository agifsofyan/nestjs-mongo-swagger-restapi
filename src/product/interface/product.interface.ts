import { Document } from 'mongoose';
import { ITopic } from '../../topic/interface/topic.interface';

export interface IProduct extends Document {
     type: string;
     name: string;
     slug: string;
     visibility: string;
     upsale: string;
     topic: ITopic[];
     short_desc: string;
     description: string;
     time_period: string;
     price: string;
     form_type: string;
     image_url: string;
     created_by: string;
     updated_by: string;
}