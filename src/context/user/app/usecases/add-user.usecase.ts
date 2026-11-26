import bcrypt from "bcrypt";
import {IUserRepository} from "../interfaces/user.repository.interface";
import {UserEntity} from "../../infra/persistances/entities/user.entity";
import {UserToAddInput} from "../inputs/user.input";
import {ensureIdentifiantDisponible, SALT_ROUNDS} from "../utils/user.utils";
import {emit} from "../../../../core/events/eventBus";
import {USER_PERMS} from "../../../../core/http/perms/perm.list";

export class AddUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(user: UserToAddInput): Promise<UserEntity> {
        await ensureIdentifiantDisponible(this.userRepository, user.identifiant);
        const created = await this.userRepository.addUser({
            identifiant: user.identifiant,
            email: user.email,
            hashedPassword: await bcrypt.hash(user.motDePasse, SALT_ROUNDS),
            perm: USER_PERMS,
        });
        emit('user.created', {id: created.id, identifiant: created.identifiant, email: created.email});
        return created;
    }
}
