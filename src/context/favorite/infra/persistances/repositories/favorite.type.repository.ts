import * as favoriteRepository from "./favorite.repository";
import {IFavoriteRepository} from "../../../app/interfaces/favorite.repository.interface";

export const typeFavoriteRepository: IFavoriteRepository = {
    getFavorites: favoriteRepository.getFavorites,
    getFavorite: favoriteRepository.getFavorite,
    addFavorite: favoriteRepository.addFavorite,
    removeFavorite: favoriteRepository.removeFavorite,
    getMaxClassement: favoriteRepository.getMaxClassement,
    updateClassements: favoriteRepository.updateClassements,
    animeExists: favoriteRepository.animeExists,
};
