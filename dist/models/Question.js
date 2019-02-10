"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Joi = require("joi");
exports.QuestionSchema = new mongoose.Schema({
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
exports.validateQuestion = (question) => {
    const schema = {
        title: Joi.string().min(3).max(255).required(),
        isParagraph: Joi.boolean().required(),
        content: Joi.required()
    };
    return Joi.validate(question, schema);
};
//# sourceMappingURL=Question.js.map