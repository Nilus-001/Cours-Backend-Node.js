import {FavoriteEntity} from "../../infra/persistances/entities/favorite.entity";

export interface IFavoriteRepository {
    getFavorites(idUser: number): Promise<FavoriteEntity[]>;
    getFavorite(idUser: number, idAnime: number): Promise<FavoriteEntity | null>;
    addFavorite(idUser: number, idAnime: number, classement: number): Promise<FavoriteEntity>;
    removeFavorite(idUser: number, idAnime: number): Promise<void>;
    getMaxClassement(idUser: number): Promise<number>;
    updateClassements(idUser: number, idAnimes: number[]): Promise<void>;
    animeExists(idAnime: number): Promise<boolean>;
}
