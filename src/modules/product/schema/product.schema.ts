import * as mongoose from 'mongoose';
// import * as slug from 'mongoose-slug-updater';

// mongoose.plugin(slug);

export const ProductSchema = new mongoose.Schema({
    webinar: {
        date: String,
        duration: String,
    	start_time: String,
    	end_time: String,
    	client_url: String,
    },

    feature: {
    	feature_onheader: String,
    	feature_onpage: String,
    },

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
	    unique: true
    },
    visibility: {
        type: String,
        enum: [ "publish", "private", "draft" ],
	    default: "publish"
    },
    topic: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }],

    image_url: String,
    video_url: String,

    headline: String,
    description: String,

    feedback: String,
    time_period: String,

    price: {
        type: Number, 
        required: true
    },
    sale_price: Number,

    created_by: String,
    updated_by: String,

    sale_method: {
        type: String,
        enum: ['normal', 'upsale', 'upgrade', 'crossale'],
	    default: "normal"
    },

    product_redirect: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Product',
        index: true
    },

    //reseller: String, // ref: User (Id & Name)

    agent: [{
        type: mongoose.Schema.Types.ObjectId,
    	ref: 'User',
    }],

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

    on_sale: {
        type: Boolean,
        default: false
    }
},{ 
	collection: 'products',
	versionKey: false, 
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
});

ProductSchema.virtual('ProductRedirect', {
    ref: 'Product',
    localField: 'product_redirect',
    foreignField: '_id',
    justOne: false, // default is false
    default: 'false'
});

ProductSchema.virtual('TopicDocument', {
    ref: 'Topic',
    localField: 'topic',
    foreignField: '_id',
    justOne: false, // default is false
    default: 'false'
});

ProductSchema.virtual('AgentDocument', {
    ref: 'Agent',
    localField: 'agent',
    foreignField: '_id',
    justOne: false, // default is false
    default: 'false'
});