import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    nohp: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    roles: {
        type: String, 
        required: true,
        enum: [ "admin", "mentor", "root" ]
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
