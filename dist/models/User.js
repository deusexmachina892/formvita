"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
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
exports.User = mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map