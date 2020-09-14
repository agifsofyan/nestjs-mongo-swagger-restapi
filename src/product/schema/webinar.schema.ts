import * as mongoose from 'mongoose';

export const WebinarSchema = new mongoose.Schema({
    date: {
	type: Date
    },
    start_time: {
     	type: String
    },
    end_time: {
        type: String
    },
    client_url: {
       	type: String
    },
    product: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Product'
    }
 },{ 
	collection: 'webinar',
	versionKey: false, 
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
});

