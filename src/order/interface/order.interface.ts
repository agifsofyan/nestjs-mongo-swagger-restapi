import { Document } from 'mongoose';

export interface IOrder extends Document {
    order_date: Date;
    type: string;
    qty: number;
    total_price: number;
    payment_status: string;
    paid_at: Date;
    due_date: Date;
    customer_id: string;
    product_id: string;
    agent_id: string;
}