import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    order_date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String, 
        required: true,
        enum: [ "wa", "web" ],
        default: 'web'
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
        enum: [ "paid", "unpaid" ],
        default: 'unpaid'
    },
    paid_at: {
        type: Date
    },
    due_date: {
        type: Date
    },
    // customer_id: {
    //     type: String
    // },
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    agent_id: {
        type: String
    },
},{ 
    collection: 'orders',
    versionKey: false, 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
