import {db} from "../../../../../core/configs/database/typeorm.config";
import {UserEntity} from "../entities/user.entity";
import {userFilterInput} from "../../../app/inputs/userFilter.input";
import {userToCreateInput, userToUpdateInput} from "../../../app/inputs/user.input";

const userRepository = () => db.getRepository(UserEntity);

export const getUsers = async (filters: userFilterInput): Promise<UserEntity[]> => {
    const query = userRepository()
        .createQueryBuilder('user')
        .orderBy('user.identifiant', 'ASC');

    if (filters.identifiant) {
        query.andWhere('LOWER(user.identifiant) LIKE LOWER(:identifiant)', {identifiant: `%${filters.identifiant}%`});
    }

    return query.getMany();
}

export const getUserById = async (id: number): Promise<UserEntity | null> => {
    return userRepository().findOne({where: {id}});
}

export const getUserByIdentifiant = async (identifiant: string): Promise<UserEntity | null> => {
    return userRepository()
        .createQueryBuilder('user')
        .where('LOWER(user.identifiant) = LOWER(:identifiant)', {identifiant})
        .getOne();
}

export const getUserWithPasswordByIdentifiant = async (identifiant: string): Promise<UserEntity | null> => {
    return userRepository()
        .createQueryBuilder('user')
        .addSelect('user.motDePasse')
        .where('LOWER(user.identifiant) = LOWER(:identifiant)', {identifiant})
        .getOne();
}

export const addUser = async (user: userToCreateInput): Promise<UserEntity> => {
    const created = userRepository().create({
        identifiant: user.identifiant,
        email: user.email ?? null,
        motDePasse: user.hashedPassword,
    });
    const saved = await userRepository().save(created);
    return getUserById(saved.id);
}

export const updateUser = async (id: number, user: userToUpdateInput): Promise<UserEntity | null> => {
    const changes: Partial<UserEntity> = {};
    if (user.identifiant !== undefined) changes.identifiant = user.identifiant;
    if (user.email !== undefined) changes.email = user.email;
    if (user.hashedPassword !== undefined) changes.motDePasse = user.hashedPassword;

    if (Object.keys(changes).length > 0) {
        await userRepository().update({id}, changes);
    }
    return getUserById(id);
}

export const deleteUser = async (id: number): Promise<void> => {
    await userRepository().delete({id});
}
