import { Router } from 'express';
import { Request, Response } from 'express';

export class DashboardRoutes{
    public router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }
    public routes(): void{
      this.router.route('/forms')
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