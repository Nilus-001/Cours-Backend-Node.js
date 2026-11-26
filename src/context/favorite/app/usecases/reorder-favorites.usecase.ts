import {IFavoriteRepository} from "../interfaces/favorite.repository.interface";
import {FavoriteEntity} from "../../infra/persistances/entities/favorite.entity";
import {FavoriteOrderError} from "../../domain/errors/favorite.errors";
import {sameIds} from "../utils/favorite.utils";

export class ReorderFavoritesUseCase {
    constructor(private readonly favoriteRepository: IFavoriteRepository) {}

    async execute(idUser: number, idAnimes: number[]): Promise<FavoriteEntity[]> {
        const actuels = (await this.favoriteRepository.getFavorites(idUser)).map((f) => f.idAnime);
        if (!sameIds(actuels, idAnimes)) {
            throw new FavoriteOrderError({attendus: actuels});
        }
        await this.favoriteRepository.updateClassements(idUser, idAnimes);
        return this.favoriteRepository.getFavorites(idUser);
    }
}
