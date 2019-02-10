"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class DashboardRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.route('/:userId/forms')
            // GET /forms 
            .get((req, res) => {
            res.status(200).send({
                success: true
            });
        })
            // POST /forms
            .post((req, res) => {
            res.status(200).send({
                success: true
            });
        });
        this.router.route('/forms/:id')
            // GET a particular form
            .get((req, res) => {
            res.status(200).send({
                success: true
            });
        });
        // Edit a particular form
    }
}
exports.DashboardRoutes = DashboardRoutes;
//# sourceMappingURL=dashboardRoutes.js.map