import {UserEntity} from "../../entities/user.entity";

export class userPresenter {
    id!: number;
    identifiant!: string;
    email!: string | null;
}

export const toUserPresenter = (user: UserEntity): userPresenter => ({
    id: user.id,
    identifiant: user.identifiant,
    email: user.email ?? null,
});
