import {Request, Response} from "express";
import {DomainResponse} from "../../../../core/http/successDomain";
import {plainToInstance} from "class-transformer";
import {UserIdParamDto} from "../dtos/user.dto";
import {UserFilterDto} from "../dtos/userFilter.dto";
import {UserFilterInput} from "../../app/inputs/userFilter.input";
import {typeUserRepository} from "../../infra/persistances/repositories/user.type.repository";
import {toUserPresenter, toUserPublicPresenter} from "../presenters/user.presenter";
import {GetUsersUseCase} from "../../app/usecases/get-user.usecase";
import {GetUserByIdUseCase} from "../../app/usecases/get-user-id.usecase";
import {AddUserUseCase} from "../../app/usecases/add-user.usecase";
import {UpdateUserUseCase} from "../../app/usecases/update-user.usecase";
import {DeleteUserUseCase} from "../../app/usecases/delete-user.usecase";
import {UpdateUserPermUseCase} from "../../app/usecases/update-user-perm.usecase";

const getUsersUseCase = new GetUsersUseCase(typeUserRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(typeUserRepository);
const addUserUseCase = new AddUserUseCase(typeUserRepository);
const updateUserUseCase = new UpdateUserUseCase(typeUserRepository);
const deleteUserUseCase = new DeleteUserUseCase(typeUserRepository);
const updateUserPermUseCase = new UpdateUserPermUseCase(typeUserRepository);

const getId = (req: Request) => plainToInstance(UserIdParamDto, req.params).id;

export const getUsers = async (req: Request, res: Response) => {
    const {identifiant} = plainToInstance(UserFilterDto, req.query);
    const filters: UserFilterInput = {identifiant};

    const users = await getUsersUseCase.execute(filters);

    res.status(200).send(new DomainResponse(users.map(toUserPublicPresenter), {total: users.length}));
}

export const getUserById = async (req: Request, res: Response) => {
    const user = await getUserByIdUseCase.execute(getId(req));
    res.status(200).send(new DomainResponse(toUserPublicPresenter(user)));
}

export const addUser = async (req: Request, res: Response) => {
    const user = await addUserUseCase.execute(req.body);
    res.status(201).send(new DomainResponse(toUserPresenter(user)));
}

export const updateUser = async (req: Request, res: Response) => {
    const user = await updateUserUseCase.execute(getId(req), req.body);
    res.status(200).send(new DomainResponse(toUserPresenter(user)));
}

export const updateUserPerm = async (req: Request, res: Response) => {
    const user = await updateUserPermUseCase.execute(getId(req), BigInt(req.body.perm));
    res.status(200).send(new DomainResponse(toUserPresenter(user)));
}

export const deleteUser = async (req: Request, res: Response) => {
    await deleteUserUseCase.execute(getId(req));
    res.status(204).send();
}
