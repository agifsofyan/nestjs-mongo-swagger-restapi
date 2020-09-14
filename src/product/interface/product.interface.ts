import { Document } from 'mongoose';
import { IWebinar } from './webinar.interface';

export interface IProduct extends Document {
     code: string;
     type: string; // Enum
     name: string;
     slug: string; // Unique
     visibility: string; // Enum
     topic: [string];
     headline: string;
     description: string;
     feedback: string;
     time_period: string;
     price: string;
     image_url: string; // Array
     video_link: string;
     created_by: string;
     updated_by: string;
     //webinar: IWebinar;
     date: string;
     start_time: string;
     end_time: string;
     client_url: string;
     sale_method: string; // enum
     product_redirect: string; // Array
     reseller: string; // ref: User (Id & Name)
     image_bonus_url: [string];
     image_text_url: [string];
     image_product_url: [string];
     section: string;
}
