import express, { Request, Response } from 'express';
import { checkToken } from '../middlewares/checkAuth';
import { isAdmin } from '../middlewares/isAdmin';

import User from '../models/users';


const router = express.Router();

router
    .route('/admin/userProfiles')
    .get(checkToken, isAdmin, async (req: Request, res: Response) => {
        // @ts-ignore
        const users = await User.find();
        return res.json(users.map(e => e.toJSON()));
    });

router
    .route('/admin/userProfiles/:email')
    .put(checkToken, isAdmin, async (req: Request, res: Response) => {
        // @ts-ignore
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                errors: ['user not found']
            });
        }

        if (req.body.firstName) {
            user.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            user.lastName = req.body.lastName;
        }
        if (req.body.birthDate) {
            user.birthDate = req.body.birthDate;
        }
        const updatedUser = await user.save();
        return res.json(updatedUser.toJSON());
    });

export default router;