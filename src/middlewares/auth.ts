import {NextFunction, Request, Response} from "express";
import {verifyAccessToken} from "../services/jwt.service";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({error: "Token d'accès manquant"});
    }

    try {
        req.user = verifyAccessToken(header.slice(7));
        next();
    } catch (e) {
        const message = e?.name === 'TokenExpiredError' ? "Token d'accès expiré" : "Token d'accès invalide";
        return res.status(401).json({error: message});
    }
}

export const isSelf = (req: Request, res: Response, next: NextFunction) => {
    if (Number(req.params.id) !== req.user?.sub) {
        return res.status(403).json({error: "Vous ne pouvez agir que sur votre propre compte"});
    }
    next();
}
