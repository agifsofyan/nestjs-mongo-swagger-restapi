import { Document } from 'mongoose';

export interface Product extends Document {
    readonly type: string;
    readonly name: string;
    readonly slug: string;
    readonly short_desc: string;
    readonly description: string;
    readonly time_period: string;
    readonly price: number;
    readonly created_at: Date;
    readonly created_by: string;
    readonly updated_at: Date;
    readonly updated_by: string;
}
