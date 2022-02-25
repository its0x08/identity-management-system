import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";

/**
 * Generates JWT token out of payload.
 * @param payload Object to sign in token
 * @returns JWT token
 */
export const generateToken = (payload: any) => {
    return sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
};

/**
 * Tries to verify and decode JWT token into payload.
 * @param token JWT Token
 * @returns Decoded apyload or throws error 
 */
export const verifyToken = (token: string) => {
    return verify(token, JWT_SECRET_KEY);
};