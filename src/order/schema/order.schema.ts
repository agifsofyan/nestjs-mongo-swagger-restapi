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
    //qty: {
    //    type: Number, 
    //    default: 1
    //},
    total_price: {
        type: Number, 
        default: 0
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
    //customer: {
    //  type: mongoose.Types.ObjectId,
    //    ref: 'Customer'
    //},
    agent_id: {
        type: String
    },
    products:[
    	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
		quantity: {
			type: Number,
			default: 1,
		}
	}
    ]
},{ 
    collection: 'orders',
    versionKey: false, 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
