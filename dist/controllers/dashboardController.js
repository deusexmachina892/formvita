"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Form_1 = require("../models/Form");
class DashboardController {
    constructor() {
        this.Form = mongoose.model('Form');
    }
    getAllFormsForUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const forms = yield this.Form.find({ created_by: req.params.userId });
            res.status(200).send({
                forms,
                success: true
            });
        });
    }
    createForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // check for errors in req.body
            const { error } = Form_1.validateForm(req.body);
            if (error)
                res.status(400).send({ msg: 'Bad Request', success: false });
            let form = new this.Form(req.body);
            form = yield form.save();
            res.status(200).send({
                form,
                success: true
            });
        });
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboardController.js.map