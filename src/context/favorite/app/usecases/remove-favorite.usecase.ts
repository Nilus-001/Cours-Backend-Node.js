import {IFavoriteRepository} from "../interfaces/favorite.repository.interface";
import {FavoriteNotFoundError} from "../../domain/errors/favorite.errors";

export class RemoveFavoriteUseCase {
    constructor(private readonly favoriteRepository: IFavoriteRepository) {}

    async execute(idUser: number, idAnime: number): Promise<void> {
        if (!await this.favoriteRepository.getFavorite(idUser, idAnime)) {
            throw new FavoriteNotFoundError({idAnime});
        }
        await this.favoriteRepository.removeFavorite(idUser, idAnime);
    }
}
