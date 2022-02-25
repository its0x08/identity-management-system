import express, { Request, Response } from 'express';
import { checkToken } from '../middlewares/checkAuth';
import User from '../models/users';


const router = express.Router();

router
	.route('/profile')
	.get(checkToken, async (req: Request, res: Response) => {
        // @ts-ignore
        const user = await User.findOne({ email: req.user.email });
        return res.json(user.toJSON());
    })
    .put(checkToken, (req: Request, res: Response) => {
        return res.json({});
    });

export default router;