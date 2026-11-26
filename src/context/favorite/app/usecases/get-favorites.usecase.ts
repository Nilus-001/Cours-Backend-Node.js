import {IFavoriteRepository} from "../interfaces/favorite.repository.interface";
import {FavoriteEntity} from "../../infra/persistances/entities/favorite.entity";

export class GetFavoritesUseCase {
    constructor(private readonly favoriteRepository: IFavoriteRepository) {}

    async execute(idUser: number): Promise<FavoriteEntity[]> {
        return this.favoriteRepository.getFavorites(idUser);
    }
}
