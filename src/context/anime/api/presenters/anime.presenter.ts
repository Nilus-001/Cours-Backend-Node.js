import {AnimeEntity} from "../../infra/persistances/entities/anime.entity";

export class LibellePresenter {
    id!: number;
    libelle!: string;
}

export class NomPresenter {
    id!: number;
    nom!: string;
}

export class AnimeSourcePresenter {
    id!: number;
    auteur!: string | null;
    dateParution!: string | null;
    type!: LibellePresenter | null;
}

export class AnimePresenter {
    id!: number;
    nom!: string;
    synopsis!: string | null;
    image!: string | null;
    dateAnnonce!: string | null;
    categorie!: LibellePresenter | null;
    genres!: LibellePresenter[];
    themes!: LibellePresenter[];
    producteurs!: NomPresenter[];
    sources!: AnimeSourcePresenter[];
    noteMoyenne!: number | null;
    nombreNotes!: number;
}

const toDateString = (date: Date | string | null | undefined): string | null => {
    if (!date) return null;
    return date instanceof Date ? date.toISOString().split('T')[0] : date;
}

export const toAnimePresenter = (anime: AnimeEntity): AnimePresenter => ({
    id: anime.id,
    nom: anime.nom,
    synopsis: anime.synopsis ?? null,
    image: anime.image ?? null,
    dateAnnonce: toDateString(anime.dateAnnonce),
    categorie: anime.categorie ? {id: anime.categorie.id, libelle: anime.categorie.libelle} : null,
    genres: (anime.genres ?? []).map(({id, libelle}) => ({id, libelle})),
    themes: (anime.themes ?? []).map(({id, libelle}) => ({id, libelle})),
    producteurs: (anime.producteurs ?? []).map(({id, nom}) => ({id, nom})),
    sources: (anime.sources ?? []).map((source) => ({
        id: source.id,
        auteur: source.auteur ?? null,
        dateParution: toDateString(source.dateParution),
        type: source.type ? {id: source.type.id, libelle: source.type.libelle} : null,
    })),
    noteMoyenne: anime.noteMoyenne ?? null,
    nombreNotes: anime.nombreNotes ?? 0,
});
