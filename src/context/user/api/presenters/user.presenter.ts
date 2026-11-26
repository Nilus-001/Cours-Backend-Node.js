import {UserEntity} from "../../infra/persistances/entities/user.entity";

export class userPublicPresenter {
    id!: number;
    identifiant!: string;
}

export const toUserPublicPresenter = (user: UserEntity): userPublicPresenter => ({
    id: user.id,
    identifiant: user.identifiant,
});

export class userPresenter {
    id!: number;
    identifiant!: string;
    email!: string | null;
    perm!: string;
}

export const toUserPresenter = (user: UserEntity): userPresenter => ({
    id: user.id,
    identifiant: user.identifiant,
    email: user.email ?? null,
    perm: user.perm.toString(),
});
