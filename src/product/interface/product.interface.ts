import { Document } from 'mongoose';
import { ITopic } from '../../topic/interface/topic.interface';

export interface IProduct extends Document {
     code: string;
     type: string; // Enum
     name: string; // Unique
     slug: string; // Unique
     visibility: string; // Enum
     topic: ITopic[]; // Array ref: Topic
     short_desc: string;
     description: string;
     time_period: string;
     price: string;
     form_type: string; // Enum
     image_url: string; // Array
     video_link: string;
     created_by: string;
     updated_by: string;
     start_at: Date;
     end_at: Date;
     location: string;
     sale_method: string; // enum
     product_redirect: string; // Array
     section: string; // Disclamer / Sub Paragraf(point)
     feedback: string;
     //seller: string; // ref: User (Id & Name)
}