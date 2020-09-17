import { Document } from 'mongoose';

export interface IFulfillment extends Document {
     name: string;
     isFullfillment: boolean;
     cover_img: string;
     product: [string]; 
     topic: [string]; 
     short_content: string; 
     content: string;
     images: [string];
     video_url: string; 
     podcash_url: string; 
}