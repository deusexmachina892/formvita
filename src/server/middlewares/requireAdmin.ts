import { Request, Response, NextFunction} from 'express';
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(!req.user.isAdmin) return res.status(403).send({error: 'You don\'t have access!', success: false});
    return next();
}