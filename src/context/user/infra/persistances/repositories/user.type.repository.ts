import * as userRepository from "./user.repository";
import {IUserRepository} from "../../../app/interfaces/user.repository.interface";

export const typeUserRepository: IUserRepository = {
    getUsers: userRepository.getUsers,
    getUserById: userRepository.getUserById,
    getUserByIdentifiant: userRepository.getUserByIdentifiant,
    addUser: userRepository.addUser,
    updateUser: userRepository.updateUser,
    deleteUser: userRepository.deleteUser,
};
