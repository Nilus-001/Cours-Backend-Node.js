import * as animeRepository from '../repositories/anime.repository';
import AnimeFilter from '../types/animeFilter.type'
import {animeToCreateInput} from "../types/inputs/anime.input";
import {animePresenter, toAnimePresenter} from "../types/presenters/anime.presenter";
import {AnimeReferenceError} from "../core/http/errors/anime.errors";

export const getAnimes = async (filters: AnimeFilter): Promise<animePresenter[]> => {
    const animes = await animeRepository.getAnimes(filters);
    return animes.map(toAnimePresenter);
}

export const addAnime = async (anime: animeToCreateInput): Promise<animePresenter> => {
    try {
        const created = await animeRepository.addAnime(anime);
        return toAnimePresenter(created);
    } catch (e) {
        if (e?.driverError?.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new AnimeReferenceError();
        }
        throw e;
    }
}
