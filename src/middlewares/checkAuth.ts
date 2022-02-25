import {Request, Response , NextFunction} from 'express';
import { verifyToken } from '../utils/jwt';


/**
 * Express middleware for veryifing token. If token
 * fails to verify, 401 error is thrown. Otherwise,
 * the decoded payload is assigned to the request object.
 * @returns void
 */
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token = String(req.headers['authorization'] || '');
    if (!token) {
        return res.status(401).json({ status: 'unauthorized'});
    }
    const onlyToken = token.replace('Bearer ', '');
    try {
        const user: any = verifyToken(onlyToken);
        // @ts-ignore
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ status: 'unauthorized'});
    }
}
 