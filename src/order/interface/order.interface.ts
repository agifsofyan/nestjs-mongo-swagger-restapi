import { Document } from 'mongoose';

export enum EnumType {
    Wa = 'wa',
    Web = 'web',
}

export enum EnumPayment {
    Paid = 'paid',
    Unpaid = 'unpaid',
}

export interface IOrder extends Document {
    readonly order_date: Date;
    readonly type: EnumType;
    readonly qty: number;
    readonly total_price: number;
    readonly payment_status: EnumPayment;
    readonly paid_at: Date;
    readonly due_date: Date;
    readonly customer_id: string;
    readonly product_id: string;
    readonly agent_id: string;
}