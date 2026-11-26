import {IFavoriteRepository} from "../interfaces/favorite.repository.interface";
import {FavoriteEntity} from "../../infra/persistances/entities/favorite.entity";
import {FavoriteAlreadyError} from "../../domain/errors/favorite.errors";
import {AnimeNotFoundError} from "../../../anime/domain/errors/anime.errors";

export class AddFavoriteUseCase {
    constructor(private readonly favoriteRepository: IFavoriteRepository) {}

    async execute(idUser: number, idAnime: number): Promise<FavoriteEntity> {
        if (!await this.favoriteRepository.animeExists(idAnime)) {
            throw new AnimeNotFoundError({id: idAnime});
        }
        if (await this.favoriteRepository.getFavorite(idUser, idAnime)) {
            throw new FavoriteAlreadyError({idAnime});
        }
        const classement = await this.favoriteRepository.getMaxClassement(idUser) + 1;
        return this.favoriteRepository.addFavorite(idUser, idAnime, classement);
    }
}
