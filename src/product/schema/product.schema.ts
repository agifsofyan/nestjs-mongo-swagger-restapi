import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    slug: {type: String},
    short_desc: {type: String},
    description: {type: String},
    time_period: {type: String},
    price: {type: Number, required: true},
    created_at: {type: Date},
    created_by: {type: String},
    updated_at: {type: Date},
    updated_by: {type: String},
},{ versionKey: false });
