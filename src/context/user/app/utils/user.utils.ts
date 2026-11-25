import {IUserRepository} from "../interfaces/user.repository.interface";
import {UserEntity} from "../../infra/persistances/entities/user.entity";
import {UserIdentifiantUsedError, UserNotFoundError, UserPermInvalidError} from "../../domain/errors/user.errors";
import {ALL_PERMS} from "../../../../core/http/perms/perm.list";

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

export const ensurePermValide = (perm: bigint): void => {
    if ((perm & ~ALL_PERMS) !== 0n) {
        throw new UserPermInvalidError({perm: perm.toString()});
    }
}
