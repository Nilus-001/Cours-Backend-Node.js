import {IUserRepository} from "../interfaces/user.repository.interface";
import {UserEntity} from "../../infra/persistances/entities/user.entity";
import {ensurePermValide, getExistingUser} from "../utils/user.utils";
import {emit} from "../../../../core/events/eventBus";

export class UpdateUserPermUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: number, perm: bigint): Promise<UserEntity | null> {
        ensurePermValide(perm);
        await getExistingUser(this.userRepository, id);

        const updated = await this.userRepository.updateUserPerm(id, perm);
        emit('user.perm.updated', {id});
        return updated;
    }
}
