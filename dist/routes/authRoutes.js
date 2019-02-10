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
const express_1 = require("express");
const passport = require("passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = require("../config");
const User_1 = require("../models/User");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
        passport.serializeUser((user, done) => {
            done(null, user['_id']);
        });
        passport.deserializeUser((id, done) => {
            User_1.User.findById(id)
                .then((user) => done(null, user))
                .catch((err) => done(err, false));
        });
        passport.use('google', this.getStrategy());
    }
    routes() {
        // initiate auth request with google
        this.router.get('/google', passport.authenticate('google', { scope: ['email', 'profile', 'openid'] }));
        this.router.get('/google/callback', passport.authenticate('google', {
            failureRedirect: '/api/v1/auth/google',
            successRedirect: '/dashboard',
            session: true
        }));
        this.router.get('/current_user', (req, res) => {
            return res.status(200).send({
                user: req.user,
                success: true
            });
        });
        this.router.get('/logout', (req, res) => {
            req.logout();
            res.status(302).redirect('/');
        });
    }
    getStrategy() {
        return new passport_google_oauth20_1.Strategy({
            clientID: config_1.default.GOOGLE_CLIENT_ID,
            clientSecret: config_1.default.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/v1/auth/google/callback",
            passReqToCallback: true
        }, function (request, accessToken, refreshToken, profile, done) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('profile', profile);
                let user = yield User_1.User.findOne({ email: profile.emails[0].value });
                if (user)
                    return done(null, user);
                user = yield new User_1.User({ email: profile.emails[0].value });
                yield user.save();
                return done(null, user);
            });
        });
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=authRoutes.js.map