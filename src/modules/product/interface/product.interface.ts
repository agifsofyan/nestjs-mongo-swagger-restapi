import { Document } from 'mongoose';

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
     price: number;
     sale_price: number;
     image_url: string; // Array
     video_link: string;
     created_by: string;
     updated_by: string;
     webinar: {
          date: string;
          duration: string;
          start_time: string;
          end_time: string;
          client_url: string;
     };
     sale_method: string; // enum
     product_redirect: string; // Array
     agent: [string]; // Customer Service
     image_bonus_url: [string];
     image_text_url: [string];
     image_product_url: [string];
     section: string;
     feature: {
     	feature_onpage: string;
     	feature_onheader: string;
     };
     on_sale: boolean;
}
