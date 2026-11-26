import bcrypt from "bcrypt";
import {IUserRepository} from "../interfaces/user.repository.interface";
import {UserEntity} from "../../infra/persistances/entities/user.entity";
import {UserToModifyInput, UserToUpdateInput} from "../inputs/user.input";
import {ensureIdentifiantDisponible, getExistingUser, SALT_ROUNDS} from "../utils/user.utils";

export class UpdateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: number, user: UserToModifyInput): Promise<UserEntity | null> {
        await getExistingUser(this.userRepository, id);

        const input: UserToUpdateInput = {};
        if (user.identifiant !== undefined) {
            await ensureIdentifiantDisponible(this.userRepository, user.identifiant, id);
            input.identifiant = user.identifiant;
        }
        if (user.email !== undefined) {
            input.email = user.email;
        }
        if (user.motDePasse !== undefined) {
            input.hashedPassword = await bcrypt.hash(user.motDePasse, SALT_ROUNDS);
        }

        return this.userRepository.updateUser(id, input);
    }
}
