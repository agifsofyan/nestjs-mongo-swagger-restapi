import { Document } from 'mongoose';
import { IProduct } from '../../product/interface/product.interface';

export enum EnumType {
    Wa = 'wa',
    Web = 'web',
}

export enum EnumPayment {
    Paid = 'paid',
    Unpaid = 'unpaid',
}

export interface IOrder extends Document {
    order_date: Date;
    type: string;
    qty: number;
    total_price: number;
    payment_status: string;
    paid_at: Date;
    due_date: Date;
    customer_id: string;
    readonly product: IProduct;
    // product_id: string;
    agent_id: string;
}
