import {Request, Response} from "express";
import * as authService from "../services/auth.service";
import {GetUserByIdUseCase} from "../context/user/app/usecases/get-user-id.usecase";
import {typeUserRepository} from "../context/user/infra/persistances/repositories/user.type.repository";
import {toUserPresenter} from "../context/user/api/presenters/user.presenter";

const getUserByIdUseCase = new GetUserByIdUseCase(typeUserRepository);

export const login = async (req: Request, res: Response) => {
    res.status(200).send(await authService.login(req.body));
}

export const refresh = async (req: Request, res: Response) => {
    res.status(200).send(await authService.refresh(req.body.refreshToken));
}

export const logout = async (req: Request, res: Response) => {
    await authService.logout(req.body.refreshToken);
    res.status(204).send();
}

export const logoutAll = async (req: Request, res: Response) => {
    await authService.logoutAll(req.user.sub);
    res.status(204).send();
}

export const me = async (req: Request, res: Response) => {
    const user = await getUserByIdUseCase.execute(req.user.sub);
    res.status(200).send(toUserPresenter(user));
}
