import * as mongoose from 'mongoose';
import * as Joi from 'joi';
import { QuestionSchema, validateQuestion }  from './Question';

const FormSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    questions: [QuestionSchema],
    assigned_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_by : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

export const validateForm = (form) => {
    const schema = {
        title: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(3).max(2048).required(),
    }

    return Joi.validate(form, schema);
}
export const Form: mongoose.model = mongoose.model('Form', FormSchema);