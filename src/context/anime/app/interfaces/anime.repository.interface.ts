import {AnimeEntity} from "../../infra/persistances/entities/anime.entity";
import {AnimeToCreateInput, AnimeToUpdateInput} from "../inputs/anime.input";
import {AnimeFilterInput} from "../inputs/animeFilter.input";


export interface IAnimeRepository {
    getAnimes(filters: AnimeFilterInput): Promise<AnimeEntity[]>;
    getAnimeById(id: number): Promise<AnimeEntity | null>;
    addAnime(anime: AnimeToCreateInput): Promise<AnimeEntity>;
    updateAnime(id: number, anime: AnimeToUpdateInput): Promise<AnimeEntity | null>;
    deleteAnime(id: number): Promise<void>;
}
