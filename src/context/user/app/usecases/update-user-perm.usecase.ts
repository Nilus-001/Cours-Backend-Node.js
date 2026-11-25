import {IUserRepository} from "../interfaces/user.repository.interface";
import {UserEntity} from "../../infra/persistances/entities/user.entity";
import {ensurePermValide, getExistingUser} from "../utils/user.utils";

export class UpdateUserPermUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: number, perm: bigint): Promise<UserEntity | null> {
        ensurePermValide(perm);
        await getExistingUser(this.userRepository, id);

        return this.userRepository.updateUserPerm(id, perm);
    }
}
