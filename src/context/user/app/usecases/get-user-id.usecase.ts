import {IUserRepository} from "../interfaces/user.repository.interface";
import {UserEntity} from "../../infra/persistances/entities/user.entity";
import {getExistingUser} from "../utils/user.utils";

export class GetUserByIdUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: number): Promise<UserEntity> {
        return getExistingUser(this.userRepository, id);
    }
}
