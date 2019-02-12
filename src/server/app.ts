import * as express from 'express';
import * as session from 'express-session';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import config from './config';
import { User } from './models/User';
import { Form } from './models/Form';
import { Answer } from './models/Answer';
import { AuthRoutes } from './routes/authRoutes';
import { DashboardRoutes } from './routes/dashboardRoutes';
import { PassportConfig } from './services/passport';
import { error } from './middlewares/error';

class App{
    public app: express.Application;
    public auth: express.Router = new AuthRoutes().router;
    public dashboard: express.Router = new DashboardRoutes().router;
    public mongoUrl: string = config.DB;
    public User: mongoose.model = User;

    constructor(){
        this.app = express();
        this.config();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(session({
            secret: 'Myfavoritesession',
            cookie:{
                maxAge: 3*24*60*60*60*1000
            },
            resave: true,
            saveUninitialized: true
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use('/api/v1/auth', this.auth);
        this.app.use('/api/v1/dashboard', this.dashboard);
        this.app.use(error);
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true
        }, () => {
            console.log('Connected to Db');
        })
    }
}

export default new App().app;