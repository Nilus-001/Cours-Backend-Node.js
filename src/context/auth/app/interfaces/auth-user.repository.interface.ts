import {UserEntity} from "../../../user/infra/persistances/entities/user.entity";

export interface IAuthUserRepository {
    getUserWithPasswordByIdentifiant(identifiant: string): Promise<UserEntity | null>;
}
