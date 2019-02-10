"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config_1 = require("./config");
const User_1 = require("./models/User");
const authRoutes_1 = require("./routes/authRoutes");
const dashboardRoutes_1 = require("./routes/dashboardRoutes");
class App {
    constructor() {
        this.auth = new authRoutes_1.AuthRoutes().router;
        this.dashboard = new dashboardRoutes_1.DashboardRoutes().router;
        this.mongoUrl = config_1.default.DB;
        this.User = User_1.User;
        this.app = express();
        this.config();
        this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(session({
            secret: 'Myfavoritesession',
            cookie: {
                maxAge: 3 * 24 * 60 * 60 * 60 * 1000
            },
            resave: true,
            saveUninitialized: true
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use('/api/v1/auth', this.auth);
        this.app.use('/api/v1/dashboard', this.dashboard);
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true
        }, () => {
            console.log('Connected to Db');
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map