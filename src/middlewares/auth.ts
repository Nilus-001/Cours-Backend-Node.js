import {NextFunction, Request, Response} from "express";
import {verifyAccessToken} from "../services/jwt.service";
import {AccountForbiddenError, TokenExpiredError, TokenInvalidError, TokenMissingError} from "../core/http/errors/auth.errors";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        throw new TokenMissingError();
    }

    try {
        req.user = verifyAccessToken(header.slice(7));
    } catch (e) {
        if (e?.name === 'TokenExpiredError') {
            throw new TokenExpiredError({expiredAt: e.expiredAt});
        }
        throw new TokenInvalidError();
    }
    next();
}

export const isSelf = (req: Request, res: Response, next: NextFunction) => {
    if (Number(req.params.id) !== req.user?.sub) {
        throw new AccountForbiddenError({id: Number(req.params.id)});
    }
    next();
}
