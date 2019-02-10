"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev_1 = require("./dev");
const prod_1 = require("./prod");
exports.default = (process.env.NODE_ENV === 'production' ? prod_1.default : dev_1.default);
//# sourceMappingURL=index.js.map