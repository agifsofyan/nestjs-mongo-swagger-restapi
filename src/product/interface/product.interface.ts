import { Document } from 'mongoose';

export enum TypeEnum {
    webinar = 'webinar',
    digital = 'digital'
}

export interface Product extends Document {
    readonly type: TypeEnum;
    readonly name: string;
    readonly slug: string;
    readonly short_desc: string;
    readonly description: string;
    readonly time_period: string;
    readonly price: number;
    readonly created_by: string;
    readonly updated_by: string;
}
