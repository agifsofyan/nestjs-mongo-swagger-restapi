import { IUser } from '../../user/interface/user.interface';
import { Document } from 'mongoose';

export interface IRefreshToken extends Document {
    userId: IUser;
    refreshToken: string;
    ip: string;
    browser: string;
}