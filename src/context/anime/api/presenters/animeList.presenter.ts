import {AnimeEntity} from "../../infra/persistances/entities/anime.entity";
import {AnimeFilterInput} from "../../app/inputs/animeFilter.input";
import {AnimePresenter, toAnimePresenter} from "./anime.presenter";
import {AnimeFilterPresenter, toAnimeFilterPresenter} from "./animeFilter.presenter";

export class AnimeListPresenter {
    animes!: AnimePresenter[];
    filtres!: AnimeFilterPresenter;
    total!: number;
}

export const toAnimeListPresenter = (filters: AnimeFilterInput, animes: AnimeEntity[]): AnimeListPresenter => ({
    animes: animes.map(toAnimePresenter),
    filtres: toAnimeFilterPresenter(filters),
    total: animes.length,
});
