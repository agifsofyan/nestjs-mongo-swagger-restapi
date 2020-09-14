import * as mongoose from 'mongoose';
//import * as slug from 'mongoose-slug-updater';

//mongoose.plugin(slug);

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
	//slug: 'slug',
	unique: true
    },
    visibility: {
        type: String,
        enum: [ "publish", "private" ],
	    default: "publish"
    },
    topic: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }],
    image_url: {
        type: String // Array
    },
    video_url: {
        type: String
    },
    headline: {
        type: String
    },
    description: {
        type: String
    },
    feedback: {
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
    date: {
    	type: String
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
    sale_method: {
        type: String,
        enum: ['normal', 'upsale', 'upgrade', 'crossale'],
	    default: "normal"
    },
    product_redirect: {
        type: String // Array
    },
    reseller: {
         type: String // ref: User (Id & Name)
     },
    image_bonus_url: [{
	type: String
    }],   
    image_text_url: [{
	type: String
    }],
    image_product_url: [{
	type: String
    }],
    section: {
	type: String
    },
},{ 
	collection: 'products',
	versionKey: false, 
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
});

// ProductSchema.virtual('topics', {
//     ref: 'Topic',
//     localField: '_id',
//     foreignField: 'topic',
// });
