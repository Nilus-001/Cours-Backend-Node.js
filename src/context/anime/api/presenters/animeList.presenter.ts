import {AnimeEntity} from "../../../../entities/anime.entity";
import {animeFilterInput} from "../../app/inputs/animeFilter.input";
import {animePresenter, toAnimePresenter} from "./anime.presenter";
import {animeFilterPresenter, toAnimeFilterPresenter} from "./animeFilter.presenter";

export class animeListPresenter {
    animes!: animePresenter[];
    filtres!: animeFilterPresenter;
    total!: number;
}

export const toAnimeListPresenter = (filters: animeFilterInput, animes: AnimeEntity[]): animeListPresenter => ({
    animes: animes.map(toAnimePresenter),
    filtres: toAnimeFilterPresenter(filters),
    total: animes.length,
});
