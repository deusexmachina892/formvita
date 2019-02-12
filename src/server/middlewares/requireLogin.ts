import { Request, Response, NextFunction } from 'express';

export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
    if(!req.user) return res.status(401).send({error: 'You are not logged in!', success: false});
    return next();
}