import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import config from './config';
import { DashboardRoutes } from './routes/dashboardRoutes';

class App{
    public app: express.Application;
    public dashboard: express.Router = new DashboardRoutes().router;
    public mongoUrl: string = config.db;

    constructor(){
        this.app = express();
        this.config();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use('/api/v1/dashboard', this.dashboard);
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