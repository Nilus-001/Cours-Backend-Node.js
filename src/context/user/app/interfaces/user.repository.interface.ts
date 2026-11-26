import {UserEntity} from "../../infra/persistances/entities/user.entity";
import {UserToCreateInput, UserToUpdateInput} from "../inputs/user.input";
import {UserFilterInput} from "../inputs/userFilter.input";

export interface IUserRepository {
    getUsers(filters: UserFilterInput): Promise<UserEntity[]>;
    getUserById(id: number): Promise<UserEntity | null>;
    getUserByIdentifiant(identifiant: string): Promise<UserEntity | null>;
    addUser(user: UserToCreateInput): Promise<UserEntity>;
    updateUser(id: number, user: UserToUpdateInput): Promise<UserEntity | null>;
    updateUserPerm(id: number, perm: bigint): Promise<UserEntity | null>;
    deleteUser(id: number): Promise<void>;
}
