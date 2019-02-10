import { Router, Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../config';
import { User } from '../models/User';

export class AuthRoutes{
    public router: Router;
    constructor(){
        this.router = Router();
        this.routes();
        
        passport.serializeUser((user, done)=>{
            done(null, user['_id']);
        });
    
        passport.deserializeUser((id, done)=>{
            User.findById(id)
                .then((user)=> done(null, user))
                .catch((err)=> done(err, false));
        });
        passport.use('google', this.getStrategy());
    }
    public routes(): void{
      // initiate auth request with google
      this.router.get('/google',
      passport.authenticate('google', { scope: 
        [ 'email', 'profile', 'openid'] }
  )
      );

      this.router.get( '/google/callback', 
      passport.authenticate( 'google', { 
          failureRedirect: '/api/v1/auth/google',
          successRedirect: '/dashboard',
          session: true
        }
        ));

      this.router.get('/current_user', (req: Request, res: Response) => {
          return res.status(200).send({
              user: req.user,
              success: true
          });
      })

      this.router.get('/logout', (req: Request, res: Response) => {
          req.logout();
          res.status(302).redirect('/');
      })
    }
    
    private getStrategy(): GoogleStrategy{
       return new GoogleStrategy({
                    clientID:     config.GOOGLE_CLIENT_ID,
                    clientSecret: config.GOOGLE_CLIENT_SECRET,
                    callbackURL: "http://localhost:8080/api/v1/auth/google/callback",
                    passReqToCallback   : true
                },
               async function(request, accessToken, refreshToken, profile, done) {
                console.log('profile', profile)   
                let user = await User.findOne({ email: profile.emails[0].value });
                   if(user) return done(null, user);
                   user = await  new User({email: profile.emails[0].value})
                   await user.save();
       
                   return done(null, user);
                });
    }
}