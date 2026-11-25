import {UserEntity} from "../../infra/persistances/entities/user.entity";
import {userToCreateInput, userToUpdateInput} from "../inputs/user.input";
import {userFilterInput} from "../inputs/userFilter.input";

export interface IUserRepository {
    getUsers(filters: userFilterInput): Promise<UserEntity[]>;
    getUserById(id: number): Promise<UserEntity | null>;
    getUserByIdentifiant(identifiant: string): Promise<UserEntity | null>;
    addUser(user: userToCreateInput): Promise<UserEntity>;
    updateUser(id: number, user: userToUpdateInput): Promise<UserEntity | null>;
    deleteUser(id: number): Promise<void>;
}
