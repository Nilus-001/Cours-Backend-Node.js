import {Request, Response} from "express";
import {typeAuthUserRepository} from "../../infra/persistances/repositories/auth-user.type.repository";
import {typeRefreshTokenRepository} from "../../infra/persistances/repositories/refresh-token.type.repository";
import {typeJwtService} from "../../infra/security/jwt.type.service";
import {LoginUseCase} from "../../app/usecases/login.usecase";
import {RefreshUseCase} from "../../app/usecases/refresh.usecase";
import {LogoutUseCase} from "../../app/usecases/logout.usecase";
import {LogoutAllUseCase} from "../../app/usecases/logout-all.usecase";
import {GetUserByIdUseCase} from "../../../user/app/usecases/get-user-id.usecase";
import {typeUserRepository} from "../../../user/infra/persistances/repositories/user.type.repository";
import {toUserPresenter} from "../../../user/api/presenters/user.presenter";

const loginUseCase = new LoginUseCase(typeAuthUserRepository, typeRefreshTokenRepository, typeJwtService);
const refreshUseCase = new RefreshUseCase(typeRefreshTokenRepository, typeJwtService);
const logoutUseCase = new LogoutUseCase(typeRefreshTokenRepository);
const logoutAllUseCase = new LogoutAllUseCase(typeRefreshTokenRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(typeUserRepository);

export const login = async (req: Request, res: Response) => {
    res.status(200).send(await loginUseCase.execute(req.body));
}

export const refresh = async (req: Request, res: Response) => {
    res.status(200).send(await refreshUseCase.execute(req.body.refreshToken));
}

export const logout = async (req: Request, res: Response) => {
    await logoutUseCase.execute(req.body.refreshToken);
    res.status(204).send();
}

export const logoutAll = async (req: Request, res: Response) => {
    await logoutAllUseCase.execute(req.user.sub);
    res.status(204).send();
}

export const me = async (req: Request, res: Response) => {
    const user = await getUserByIdUseCase.execute(req.user.sub);
    res.status(200).send(toUserPresenter(user));
}
