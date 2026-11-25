import {AnimeEntity} from "../../infra/persistances/entities/anime.entity";
import {animeToCreateInput} from "../inputs/anime.input";
import {animeFilterInput} from "../inputs/animeFilter.input";


export interface IAnimeRepository {
    getAnimes(filters: animeFilterInput): Promise<AnimeEntity[]>;
    getAnimeById(id: number): Promise<AnimeEntity | null>;
    addAnime(anime: animeToCreateInput): Promise<AnimeEntity>;
}