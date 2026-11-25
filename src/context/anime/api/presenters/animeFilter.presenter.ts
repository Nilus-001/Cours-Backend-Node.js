import {animeFilterInput} from "../../app/inputs/animeFilter.input";

export class animeFilterPresenter {
    nom?: string;
    dateAnnonce?: string;
    idCategorie?: number;
    idGenre?: number;
    idTheme?: number;
}

export const toAnimeFilterPresenter = (filters: animeFilterInput): animeFilterPresenter =>
    Object.fromEntries(Object.entries(filters ?? {}).filter(([, value]) => value !== undefined && value !== ''));
