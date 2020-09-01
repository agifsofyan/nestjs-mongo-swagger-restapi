import { Document } from 'mongoose';

export interface IOrder extends Document {
    readonly order_date: Date;
    readonly type: string;
    readonly qty: number;
    readonly total_price: number;
    readonly payment_status: string;
    readonly paid_at: Date;
    readonly due_date: Date;
    readonly customer_id: string;
    readonly product_id: string;
    readonly agent_id: string;
    readonly created_at: Date;
    readonly updated_at: Date;
}
