import {AnimeEntity} from "../../infra/persistances/entities/anime.entity";
import {AnimeFilterInput} from "../../app/inputs/animeFilter.input";
import {DomainResponse} from "../../../../core/http/successDomain";
import {AnimePresenter, toAnimePresenter} from "./anime.presenter";
import {AnimeFilterPresenter, toAnimeFilterPresenter} from "./animeFilter.presenter";

export class AnimeListMeta {
    filtres!: AnimeFilterPresenter;
    total!: number;
}

export const toAnimeListPresenter = (filters: AnimeFilterInput, animes: AnimeEntity[]): DomainResponse<AnimePresenter[], AnimeListMeta> =>
    new DomainResponse(animes.map(toAnimePresenter), {
        filtres: toAnimeFilterPresenter(filters),
        total: animes.length,
    });
