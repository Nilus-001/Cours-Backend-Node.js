import {FavoriteEntity} from "../../infra/persistances/entities/favorite.entity";
import {DomainResponse} from "../../../../core/http/successDomain";

export class FavoriteAnimePresenter {
    id!: number;
    nom!: string;
    image!: string | null;
}

export class FavoritePresenter {
    anime!: FavoriteAnimePresenter;
    classement!: number | null;
}

export class FavoriteListMeta {
    total!: number;
}

export const toFavoritePresenter = (favorite: FavoriteEntity): FavoritePresenter => ({
    anime: {id: favorite.anime.id, nom: favorite.anime.nom, image: favorite.anime.image ?? null},
    classement: favorite.classementFavoris ?? null,
});

export const toFavoriteListPresenter = (favorites: FavoriteEntity[]): DomainResponse<FavoritePresenter[], FavoriteListMeta> =>
    new DomainResponse(favorites.map(toFavoritePresenter), {total: favorites.length});
