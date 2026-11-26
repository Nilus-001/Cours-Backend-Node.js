import {AnimeEntity} from "../../infra/persistances/entities/anime.entity";
import {AnimeToCreateInput} from "../inputs/anime.input";
import {AnimeFilterInput} from "../inputs/animeFilter.input";


export interface IAnimeRepository {
    getAnimes(filters: AnimeFilterInput): Promise<AnimeEntity[]>;
    getAnimeById(id: number): Promise<AnimeEntity | null>;
    addAnime(anime: AnimeToCreateInput): Promise<AnimeEntity>;
}