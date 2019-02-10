"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const AnswerSchema = new mongoose.Schema({
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
exports.Answer = mongoose.model('Answer', AnswerSchema);
//# sourceMappingURL=Answer.js.map