import {NextFunction, Request, Response} from "express";
import {verifyAccessToken} from "../security/jwt.service";
import {AccountForbiddenError, TokenExpiredError, TokenInvalidError, TokenMissingError, TokenRevokedError} from "../../domain/errors/auth.errors";
import {isTokenRevoked} from "../security/token-revocation.store";
import {Perm} from "../../../../core/http/perms/perm.list";
import {hasPerm} from "../../../../core/http/perms/utils/permission.util";

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
    if (isTokenRevoked(req.user)) {
        throw new TokenRevokedError();
    }
    next();
}

export const isSelfOrPermission = (permission: bigint) => (req: Request, res: Response, next: NextFunction) => {
    const perms = req.user?.perm ?? 0n;
    const self = Number(req.params.id) === req.user?.sub;
    if (!self && !hasPerm(perms, Perm.ADMINISTRATOR) && !hasPerm(perms, permission)) {
        throw new AccountForbiddenError({id: Number(req.params.id)});
    }
    next();
}
