import { Document } from 'mongoose';

export interface IFulfillment extends Document {
     name: string;
     isFullfillment: boolean;
     cover_img: string;
     product: [string]; 
     category: [string]; 
     short_content: string; 
     content: string;
     images: [string];
     video_url: string; 
     podcash_url: string; 
}