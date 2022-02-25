import { Request, Response, NextFunction } from 'express';


/**
 * Express middleware meant to run after checkToken.
 * If user.isAdmin then request goes through, otherwise 401.
 * @returns void
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ status: 'forbidden' });
}
