import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly name: string;
    readonly email: string;
    readonly phone_number: string;
    password: string;
    readonly roles: [string];
    readonly created_at: Date;
    readonly updated_at: Date;
}
