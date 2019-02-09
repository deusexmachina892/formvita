import * as mongoose from 'mongoose';

const QuestionSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String
    },
    isParagraph: {
        type: Boolean,
        default: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed
    },
    form_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    },
    answers: [
       { 
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Answer'
       }
    ],
    created_date: {
        type: Date,
        default: Date.now()
    }
});

export default QuestionSchema;