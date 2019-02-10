import * as mongoose from 'mongoose';

const UserSchema: mongoose.Schema = new mongoose.Schema({
    email: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

export const User: mongoose.model = mongoose.model('User', UserSchema);