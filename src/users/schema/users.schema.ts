import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UsersSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true},
    phone_number: {type: String, required: true},
    password: {type: String, required: true},
    roles: {type: [String], default: ['user']},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date}
}, { collection: 'user_admins' });

UsersSchema.pre('save', async function(next: mongoose.HookNextFunction) {
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