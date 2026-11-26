import {UserEntity} from "../../infra/persistances/entities/user.entity";

export class UserPublicPresenter {
    id!: number;
    identifiant!: string;
}

export const toUserPublicPresenter = (user: UserEntity): UserPublicPresenter => ({
    id: user.id,
    identifiant: user.identifiant,
});

export class UserPresenter {
    id!: number;
    identifiant!: string;
    email!: string | null;
    perm!: string;
}

export const toUserPresenter = (user: UserEntity): UserPresenter => ({
    id: user.id,
    identifiant: user.identifiant,
    email: user.email ?? null,
    perm: user.perm.toString(),
});
