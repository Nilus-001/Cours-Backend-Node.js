import {IUserRepository} from "../interfaces/user.repository.interface";
import {UserEntity} from "../../infra/persistances/entities/user.entity";
import {userFilterInput} from "../inputs/userFilter.input";

export class GetUsersUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(filters: userFilterInput): Promise<UserEntity[]> {
        return this.userRepository.getUsers(filters);
    }
}
