import rateLimit from 'express-rate-limit';

export const signInLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 4,
	standardHeaders: true,
	legacyHeaders: false,
});

export const generalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})