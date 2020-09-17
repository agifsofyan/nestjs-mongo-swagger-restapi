import * as mongoose from 'mongoose';
import * as slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

export const ProductSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    type: {
	    type: String, 
        required: true,
        enum: [ "webinar", "digital", "ecommerce", "bonus" ],
	    default: "webinar"
    },
    name: {
        type: String, 
        required: true
    },
    slug: {
        type: String,
        slug: 'slug',
	    unique: true
    },
    visibility: {
        type: String,
        enum: [ "publish", "private", "draft" ],
	    default: "publish"
    },
    topic: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],

    image_url: String,
    video_url: String,

    headline: String,
    description: String,

    feedback: String,
    time_period: String,

    price: {
        type: String, 
        required: true
    },

    created_by: String,
    updated_by: String,

    webinar: {
        date: Date,
        start_time: String,
        end_time: String,
        client_url: String
    },

    sale_method: {
        type: String,
        enum: ['normal', 'upsale', 'upgrade', 'crossale'],
	    default: "normal"
    },

    product_redirect: String, // Array

    reseller: String, // ref: User (Id & Name)

    image_bonus_url: [{
	    type: String
    }],   
    image_text_url: [{
	    type: String
    }],
    image_product_url: [{
	    type: String
    }],

    section: String,
},{ 
	collection: 'products',
	versionKey: false, 
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
});
