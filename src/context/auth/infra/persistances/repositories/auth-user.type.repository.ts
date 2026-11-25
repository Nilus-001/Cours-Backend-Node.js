import * as userRepository from "../../../../user/infra/persistances/repositories/user.repository";
import {IAuthUserRepository} from "../../../app/interfaces/auth-user.repository.interface";

export const typeAuthUserRepository: IAuthUserRepository = {
    getUserWithPasswordByIdentifiant: userRepository.getUserWithPasswordByIdentifiant,
};
