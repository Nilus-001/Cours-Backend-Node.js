export class AnimeToCreateInput {
    nom!: string;
    synopsis?: string | null;
    image?: string | null;
    dateAnnonce?: string | null;
    idCategorie?: number | null;
    idGenres?: number[];
    idThemes?: number[];
    idProducteurs?: number[];
    idSources?: number[];
}

export class AnimeToUpdateInput {
    nom?: string;
    synopsis?: string | null;
    image?: string | null;
    dateAnnonce?: string | null;
    idCategorie?: number | null;
    idGenres?: number[];
    idThemes?: number[];
    idProducteurs?: number[];
    idSources?: number[];
}
