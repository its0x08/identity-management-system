import {Request, Response , NextFunction} from 'express';
import { verifyToken } from '../utils/jwt';


export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token = String(req.headers['authorization'] || '');
    if (!token) {
        return res.status(401).json({ status: 'unauthorized'});
    }
    // "Bearer ABCKOSADJLKSDJLAKSDJAKLSD"
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
 