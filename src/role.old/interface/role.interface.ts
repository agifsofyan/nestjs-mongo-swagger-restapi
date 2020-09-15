import { Document } from 'mongoose';

export interface IRole extends Document {
     adminType: string;
     readWrite: boolean;
}