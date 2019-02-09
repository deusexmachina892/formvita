import { Request, Response } from 'express';

export class DashboardRoutes{

  // GET /forms 
    public routes(app): void{
      app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                success: true
            })
        });
    }
}