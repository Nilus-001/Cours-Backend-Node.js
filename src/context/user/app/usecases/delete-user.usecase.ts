import {IUserRepository} from "../interfaces/user.repository.interface";
import {UserDependenciesError} from "../../domain/errors/user.errors";
import {getExistingUser} from "../utils/user.utils";

export class DeleteUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: number): Promise<void> {
        await getExistingUser(this.userRepository, id);
        try {
            await this.userRepository.deleteUser(id);
        } catch (e) {
            if (e?.driverError?.code === 'ER_ROW_IS_REFERENCED_2') {
                throw new UserDependenciesError({id});
            }
            throw e;
        }
    }
}
