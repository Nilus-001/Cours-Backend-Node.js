import {IFavoriteRepository} from "../interfaces/favorite.repository.interface";
import {FavoriteEntity} from "../../infra/persistances/entities/favorite.entity";
import {FavoriteNotFoundError} from "../../domain/errors/favorite.errors";

export class GetFavoriteUseCase {
    constructor(private readonly favoriteRepository: IFavoriteRepository) {}

    async execute(idUser: number, idAnime: number): Promise<FavoriteEntity> {
        const favorite = await this.favoriteRepository.getFavorite(idUser, idAnime);
        if (!favorite) {
            throw new FavoriteNotFoundError({idAnime});
        }
        return favorite;
    }
}
