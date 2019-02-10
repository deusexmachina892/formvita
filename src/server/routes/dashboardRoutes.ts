import { Router, Request, Response } from 'express';
import { DashboardController } from '../controllers/dashboardController';

export class DashboardRoutes{
    public router: Router;
    public dashboardController: DashboardController;

    constructor(){
        this.router = Router();
        this.routes();
    }
    public routes(): void{
      this.router.route('/:userId/forms')
      // GET /forms 
        .get((req: Request, res: Response) => {
            res.status(200).send({
                success: true
            })
        })
      // POST /forms
        .post((req: Request, res: Response) => {
            res.status(200).send({
                success: true
            })
        });

      this.router.route('/forms/:id')
      // GET a particular form
        .get((req: Request, res: Response) => {
            res.status(200).send({
                success: true
            })
        })
      // Edit a particular form
    }
}