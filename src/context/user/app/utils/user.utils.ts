import {IUserRepository} from "../interfaces/user.repository.interface";
import {UserEntity} from "../../infra/persistances/entities/user.entity";
import {UserIdentifiantUsedError, UserNotFoundError} from "../../domain/errors/user.errors";

export const SALT_ROUNDS = 10;

export const ensureIdentifiantDisponible = async (userRepository: IUserRepository, identifiant: string, idActuel?: number): Promise<void> => {
    const existant = await userRepository.getUserByIdentifiant(identifiant);
    if (existant && existant.id !== idActuel) {
        throw new UserIdentifiantUsedError({identifiant});
    }
}

export const getExistingUser = async (userRepository: IUserRepository, id: number): Promise<UserEntity> => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new UserNotFoundError({id});
    }
    return user;
}
