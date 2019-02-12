import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../config';


export class PassportConfig{
    public User: mongoose.model = mongoose.model('User');
    //Serialize user
        constructor(){
            passport.serializeUser((user, done)=>{
                done(null, user['_id']);
            });
        
            passport.deserializeUser((id, done)=>{
                this.User.findById(id)
                    .then((user)=> done(null, user))
                    .catch((err)=> done(err, false));
            });
        }
        // passport.use(new GoogleStrategy({
        //     clientID:     config.GOOGLE_CLIENT_ID,
        //     clientSecret: config.GOOGLE_CLIENT_SECRET,
        //     callbackURL: "api/v1/auth/google/callback",
        //     passReqToCallback   : true
        // },
        // function(request, accessToken, refreshToken, profile, done) {
        //     this.User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        //     });
        // }
        // ));

}