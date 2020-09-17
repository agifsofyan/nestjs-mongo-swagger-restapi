import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    password: {type: String, required: true },
    role: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
}, { 
    collection: 'administrators',
    versionKey: false, 
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;

        return next();
    } catch (err) {
        return next(err);
    }
});
