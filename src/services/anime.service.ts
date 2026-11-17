import * as animeRepository from '../repositories/anime.repository';
import AnimeFilter from '../types/animeFilter.type'
import {animeToCreateInput} from "../types/inputs/anime.input";
import {animePresenter, toAnimePresenter} from "../types/presenters/anime.presenter";

export const getAnimes = async (filters: AnimeFilter): Promise<animePresenter[]> => {
    const animes = await animeRepository.getAnimes(filters);
    return animes.map(toAnimePresenter);
}

export const addAnime = async (anime: animeToCreateInput): Promise<animePresenter> => {
    const created = await animeRepository.addAnime(anime);
    return toAnimePresenter(created);
}
