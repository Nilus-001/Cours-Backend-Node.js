import {rateLimit} from "express-rate-limit";
import {TooManyLoginAttemptsError} from "../../domain/errors/auth.errors";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        next(new TooManyLoginAttemptsError({retryAfterSeconds: Math.ceil(options.windowMs / 1000)}));
    },
});
