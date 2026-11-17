import bcrypt from "bcrypt";
import * as userRepository from "../repositories/user.repository";
import UserFilter from "../types/userFilter.type";
import {userToCreateDTO, userToUpdateDTO} from "../types/dtos/user.dtos";
import {userToUpdateInput} from "../types/inputs/user.input";
import {toUserPresenter, userPresenter} from "../types/presenters/user.presenter";
import {HttpError} from "../types/errors/httpError";

const SALT_ROUNDS = 10;

const ensureIdentifiantDisponible = async (identifiant: string, idActuel?: number) => {
    const existant = await userRepository.getUserByIdentifiant(identifiant);
    if (existant && existant.id !== idActuel) {
        throw new HttpError(409, "Cet identifiant est déjà utilisé");
    }
}

const getExistingUser = async (id: number) => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new HttpError(404, "Utilisateur introuvable");
    }
    return user;
}

export const getUsers = async (filters: UserFilter): Promise<userPresenter[]> => {
    const users = await userRepository.getUsers(filters);
    return users.map(toUserPresenter);
}

export const getUserById = async (id: number): Promise<userPresenter> => {
    return toUserPresenter(await getExistingUser(id));
}

export const addUser = async (user: userToCreateDTO): Promise<userPresenter> => {
    await ensureIdentifiantDisponible(user.identifiant);
    const created = await userRepository.addUser({
        identifiant: user.identifiant,
        hashedPassword: await bcrypt.hash(user.motDePasse, SALT_ROUNDS),
    });
    return toUserPresenter(created);
}

export const updateUser = async (id: number, user: userToUpdateDTO): Promise<userPresenter> => {
    await getExistingUser(id);

    const input: userToUpdateInput = {};
    if (user.identifiant !== undefined) {
        await ensureIdentifiantDisponible(user.identifiant, id);
        input.identifiant = user.identifiant;
    }
    if (user.motDePasse !== undefined) {
        input.hashedPassword = await bcrypt.hash(user.motDePasse, SALT_ROUNDS);
    }

    const updated = await userRepository.updateUser(id, input);
    return toUserPresenter(updated);
}

export const deleteUser = async (id: number): Promise<void> => {
    await getExistingUser(id);
    try {
        await userRepository.deleteUser(id);
    } catch (e) {
        if (e?.driverError?.code === 'ER_ROW_IS_REFERENCED_2') {
            throw new HttpError(409, "Impossible de supprimer : l'utilisateur a des avis ou des animes dans sa liste");
        }
        throw e;
    }
}
