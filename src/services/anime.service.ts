import * as animeRepository from '../repositories/anime.repository';
import AnimeFilter from '../types/animeFilter.type'
import Anime from "../types/anime.type";

export const getAnimes =  (filters : AnimeFilter) => {
    const animeResult = animeRepository.getAnimes(filters);
    return animeResult;
}

export const addAnime = (anime : Anime) => {
    const animeResult = animeRepository.addAnime(anime);
    return animeResult;
}