import { IUser } from '../../user/interfaces/user.interface';
import { Document } from 'mongoose';

export interface IRefreshToken extends Document {
    userId: IUser;
    refreshToken: string;
    ip: string;
    browser: string;
}