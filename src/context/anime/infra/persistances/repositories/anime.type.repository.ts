import * as animeRepository from "../../../infra/persistances/repositories/anime.repository";
import {IAnimeRepository} from "../../../app/interfaces/anime.repository.interface";

export const typeAnimeRepository: IAnimeRepository = {
    getAnimes: animeRepository.getAnimes,
    getAnimeById: animeRepository.getAnimeById,
    addAnime: animeRepository.addAnime,
    updateAnime: animeRepository.updateAnime,
    deleteAnime: animeRepository.deleteAnime,
};