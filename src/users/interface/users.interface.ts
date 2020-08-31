import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly username: string;
    readonly email: string;
    readonly nohp: string;
    readonly password: string;
    readonly roles: string;
    readonly created_at: Date;
}
