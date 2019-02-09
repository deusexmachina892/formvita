import * as mongoose from 'mongoose';

const AnswerSchema: mongoose.Schema = new mongoose.Schema({
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

export const Contact: mongoose.model = mongoose.model('Answer', AnswerSchema);