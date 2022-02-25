import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";

export const generateToken = (payload: any) => {
    return sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
    return verify(token, JWT_SECRET_KEY);
};