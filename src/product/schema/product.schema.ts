import * as mongoose from 'mongoose';
import * as slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

export const ProductSchema = new mongoose.Schema({
    type: {
	    type: String, 
        required: true,
        enum: [ "webinar", "digital", "ecommerce", "bonus" ],
	    default: "webinar"
    },
    name: {
        type: String, 
        required: true,
	    unique: true
    },
    slug: {
        type: String,
	    slug: "name",
	    unique: true
    },
    short_desc: {
        type: String
    },
    description: {
        type: String
    },
    time_period: {
        type: String
    },
    price: {
        type: String, 
        required: true
    },
    created_by: {
        type: String
    },
    updated_by: {
    	type: String
    },
},{ 
	collection: 'products',
	versionKey: false, 
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
});
