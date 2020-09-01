import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    order_date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String, 
        required: true,
        enum: [ "wa", "web" ]
    },
    qty: {
        type: Number, 
        required: true
    },
    total_price: {
        type: Number, 
        required: true
    },
    payment_status: {
        type: String, 
        required: true,
        enum: [ "paid", "unpaid" ]
    },
    paid_at: {
        type: Date
    },
    due_date: {
        type: Date
    },
    customer_id: {
        type: String
    },
    agent_id: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
},{ versionKey: false });
