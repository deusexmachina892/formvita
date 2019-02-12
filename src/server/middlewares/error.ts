import { Request, Response, NextFunction } from 'express';
export const error = (err, req: Request, res: Response, next: NextFunction) => {
    if(err) {
        console.log(err)
        return res.status(400).send({ error: err.message, success: false })};
    return next();
}