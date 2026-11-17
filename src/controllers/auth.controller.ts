import {Request, Response} from "express";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import {HttpError} from "../types/errors/httpError";

const handleError = (res: Response, e: unknown, message: string) => {
    if (e instanceof HttpError) {
        return res.status(e.status).json({error: e.message});
    }
    console.error(e);
    res.status(500).json({error: message});
}

export const login = async (req: Request, res: Response) => {
    try {
        res.status(200).send(await authService.login(req.body));
    } catch (e) {
        handleError(res, e, "Erreur lors de la connexion");
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        res.status(200).send(await authService.refresh(req.body.refreshToken));
    } catch (e) {
        handleError(res, e, "Erreur lors du renouvellement du token");
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        await authService.logout(req.body.refreshToken);
        res.status(204).send();
    } catch (e) {
        handleError(res, e, "Erreur lors de la déconnexion");
    }
}

export const logoutAll = async (req: Request, res: Response) => {
    try {
        await authService.logoutAll(req.user.sub);
        res.status(204).send();
    } catch (e) {
        handleError(res, e, "Erreur lors de la déconnexion");
    }
}

export const me = async (req: Request, res: Response) => {
    try {
        res.status(200).send(await userService.getUserById(req.user.sub));
    } catch (e) {
        handleError(res, e, "Erreur lors de la récupération du profil");
    }
}
