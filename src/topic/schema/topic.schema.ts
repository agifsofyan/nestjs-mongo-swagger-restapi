import * as mongoose from 'mongoose';
import * as slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

export const TopicSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
	    unique: true
    },
    slug: {
        type: String,
        unique: true
	    slug: "name"
    }
},{ 
	collection: 'topics',
	versionKey: false, 
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
});
