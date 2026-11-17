import {Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import * as userService from "../services/user.service";
import {userFilterDTO, userIdParamDTO} from "../types/dtos/user.dtos";
import {HttpError} from "../types/errors/httpError";

const handleError = (res: Response, e: unknown, message: string) => {
    if (e instanceof HttpError) {
        return res.status(e.status).json({error: e.message});
    }
    console.error(e);
    res.status(500).json({error: message});
}

const getId = (req: Request) => plainToInstance(userIdParamDTO, req.params).id;

export const getUsers = async (req: Request, res: Response) => {
    try {
        const filters = plainToInstance(userFilterDTO, req.query);
        res.status(200).send(await userService.getUsers(filters));
    } catch (e) {
        handleError(res, e, "Erreur lors de la récupération des utilisateurs");
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        res.status(200).send(await userService.getUserById(getId(req)));
    } catch (e) {
        handleError(res, e, "Erreur lors de la récupération de l'utilisateur");
    }
}

export const addUser = async (req: Request, res: Response) => {
    try {
        res.status(201).send(await userService.addUser(req.body));
    } catch (e) {
        handleError(res, e, "Erreur lors de l'ajout de l'utilisateur");
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        res.status(200).send(await userService.updateUser(getId(req), req.body));
    } catch (e) {
        handleError(res, e, "Erreur lors de la modification de l'utilisateur");
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await userService.deleteUser(getId(req));
        res.status(204).send();
    } catch (e) {
        handleError(res, e, "Erreur lors de la suppression de l'utilisateur");
    }
}
