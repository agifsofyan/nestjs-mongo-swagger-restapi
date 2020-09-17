import * as mongoose from 'mongoose';
import { type } from 'os';

export const FulfillmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isFullfillment: {
        type: Boolean,
        default: true //[true/false]: true to fullfillment | false to blog
    },
    cover_img: {
        type: String,
        // required: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    topic: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }], 
    short_content: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    images: [{ type: String }],
    video_url: String,
    podcash_url: String 
},{ 
	collection: 'fullfillments',
	versionKey: false, 
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
});
