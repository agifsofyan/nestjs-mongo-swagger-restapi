import { Document } from 'mongoose';
import { IProduct } from '../../product/interface/product.interface';

interface productOrder {
	product: IProduct;
	quantity: number;
}

export interface IOrder extends Document {
    order_date: Date;
    type: string;
    quantity: number;
    total_price: number;
    payment_status: string;
    paid_at: Date;
    due_date: Date;
    product: productOrder[];
    agent_id: string;
}
