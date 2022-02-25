import express, { Request, Response, NextFunction } from 'express';
import User from '../models/users';


const router = express.Router();

router
	.route('/profile')
	.get(async (req: Request, res: Response) => {
        // @ts-ignore
        const user = await User.findOne({ email: req.user.email });
        return res.json(user.toJSON());
    })
    .put((req: Request, res: Response) => {
        return res.json({});
    });

export default router;