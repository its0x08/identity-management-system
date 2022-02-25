import express, { Request, Response } from 'express';
import Joi from 'joi';
import { checkToken } from '../middlewares/checkAuth';
import User from '../models/users';
import { compareHash, hash } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';

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

const validateLogin = (body: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(40),
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
            return res.json({ message: 'created', errors: [] });
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
    });


router
    .route('/login')
    .post(async (req: Request, res: Response) => {
        if (!req.body) {
            return res.status(400).json({
                status: 'failed',
                errors: [
                    'Data is required'
                ]
            });
        }
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(400).json({
                status: 'failed',
                errors: error.details.map(e => e.message)
            });
        }
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(404).json({ status: 'not found' });

        const hashMatch = await compareHash(req.body.password, user.password);
        if (!hashMatch) return res.status(400).json({ status: 'wrong password' });

        const userJson = user.toJSON();
        const token = generateToken(userJson);
        return res.json({ message: 'success', user: userJson, token});
    });

router
    .route('/logout')
    .get(checkToken, (req: Request, res: Response)=>{
        return res.json({status: 'logged out'})
    })

export default router;
