import rateLimit from 'express-rate-limit';

/**
 * Rate limiter only for login route.
 */
export const signInLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 4,
	standardHeaders: true,
	legacyHeaders: false,
});


/**
 * General rate limiter for all backend routes.
 */
export const generalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})