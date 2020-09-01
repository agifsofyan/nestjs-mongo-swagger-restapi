import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly username: string;
    readonly email: string;
    readonly phone_number: string;
    readonly password: string;
    readonly roles: [string];
    readonly created_at: Date;
}
