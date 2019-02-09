import * as mongoose from 'mongoose';
import QuestionSchema from './Question';

const FormSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    questions: [QuestionSchema],
    created_by : {
        type: mongoose.Schema.Types.ObjectId
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

export const Contact: mongoose.model = mongoose.model('Form', FormSchema);