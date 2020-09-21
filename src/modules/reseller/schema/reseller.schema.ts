import * as mongoose from 'mongoose';

export const ResellerSchema = new mongoose.Schema({
    content: String,
    images: [String]
},{ 
	collection: 'resellers',
	versionKey: false, 
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
});
