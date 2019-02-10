"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Joi = require("joi");
const Question_1 = require("./Question");
const FormSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    questions: [Question_1.QuestionSchema],
    created_by: {
        type: mongoose.Schema.Types.ObjectId
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});
exports.validateForm = (form) => {
    const schema = {
        title: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(3).max(2048).required(),
    };
    return Joi.validate(form, schema);
};
exports.Form = mongoose.model('Form', FormSchema);
//# sourceMappingURL=Form.js.map