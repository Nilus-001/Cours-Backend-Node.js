import {AnimeFilterInput} from "../../app/inputs/animeFilter.input";

export class AnimeFilterPresenter {
    nom?: string;
    dateAnnonce?: string;
    idCategorie?: number;
    idGenre?: number;
    idTheme?: number;
}

export const toAnimeFilterPresenter = (filters: AnimeFilterInput): AnimeFilterPresenter =>
    Object.fromEntries(Object.entries(filters ?? {}).filter(([, value]) => value !== undefined && value !== ''));
