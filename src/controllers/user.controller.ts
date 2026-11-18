import {Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import * as userService from "../services/user.service";
import {userFilterDTO, userIdParamDTO} from "../types/dtos/user.dtos";

const getId = (req: Request) => plainToInstance(userIdParamDTO, req.params).id;

export const getUsers = async (req: Request, res: Response) => {
    const filters = plainToInstance(userFilterDTO, req.query);
    res.status(200).send(await userService.getUsers(filters));
}

export const getUserById = async (req: Request, res: Response) => {
    res.status(200).send(await userService.getUserById(getId(req)));
}

export const addUser = async (req: Request, res: Response) => {
    res.status(201).send(await userService.addUser(req.body));
}

export const updateUser = async (req: Request, res: Response) => {
    res.status(200).send(await userService.updateUser(getId(req), req.body));
}

export const deleteUser = async (req: Request, res: Response) => {
    await userService.deleteUser(getId(req));
    res.status(204).send();
}
