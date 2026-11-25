import {AnimeEntity} from "../../../../entities/anime.entity";

export class libellePresenter {
    id!: number;
    libelle!: string;
}

export class nomPresenter {
    id!: number;
    nom!: string;
}

export class animeSourcePresenter {
    id!: number;
    auteur!: string | null;
    dateParution!: string | null;
    type!: libellePresenter | null;
}

export class animePresenter {
    id!: number;
    nom!: string;
    synopsis!: string | null;
    image!: string | null;
    dateAnnonce!: string | null;
    categorie!: libellePresenter | null;
    genres!: libellePresenter[];
    themes!: libellePresenter[];
    producteurs!: nomPresenter[];
    sources!: animeSourcePresenter[];
}

const toDateString = (date: Date | string | null | undefined): string | null => {
    if (!date) return null;
    return date instanceof Date ? date.toISOString().split('T')[0] : date;
}

export const toAnimePresenter = (anime: AnimeEntity): animePresenter => ({
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
});
