import express, { Request, Response } from 'express';
import Joi from 'joi';
import User from '../models/users';
import { hash } from '../utils/bcrypt';



const router = express.Router();

const validateUser = (body: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(40),
        firstName: Joi.string().min(4).max(30),
        lastName: Joi.string().min(4).max(30),
        birthDate: Joi.date().required(),
    });
    return schema.validate(body);
}

router
    .route('/register')
    .post(async (req: Request, res: Response) => {
        if (!req.body) {
            return res.status(400).json({
                status: 'failed',
                errors: [
                    'User data is required'
                ]
            });
        }
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({
                status: 'failed',
                errors: error.details.map(e => e.message)
            });
        }
        const user = new User(req.body);
        user.password = await hash(user.password);
        try {
            await user.save();
        } catch (error: any) {
            if (error.code === 11000) {
                return res.status(400).json({
                    status: 'failed',
                    errors: ['Email already exists']
                });
            }
            return res.status(400).json({
                status: 'failed'
            });
        }
        res.json({ message: 'created', errors: [] });
    });


export default router;
