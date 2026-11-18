import * as animeRepository from '../repositories/anime.repository';
import AnimeFilter from '../types/animeFilter.type'
import {animeToCreateInput} from "../types/inputs/anime.input";
import {animePresenter, toAnimePresenter} from "../types/presenters/anime.presenter";
import {AnimeNotFoundError, AnimeReferenceError} from "../core/http/errors/anime.errors";

export const getAnimes = async (filters: AnimeFilter): Promise<animePresenter[]> => {
    const animes = await animeRepository.getAnimes(filters);
    return animes.map(toAnimePresenter);
}

export const getAnimeById = async (id: number): Promise<animePresenter> => {
    const anime = await animeRepository.getAnimeById(id);
    if (!anime) {
        throw new AnimeNotFoundError({id});
    }
    return toAnimePresenter(anime);
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
