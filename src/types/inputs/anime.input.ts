export class animeToCreateInput {
    nom!: string;
    synopsis?: string | null;
    image?: string | null;
    dateAnnonce?: Date | null;
    idCategorie?: number | null;
    idGenres?: number[];
    idThemes?: number[];
    idProducteurs?: number[];
    idSources?: number[];
}

export class animeToUpdateInput {
    nom?: string;
    synopsis?: string | null;
    image?: string | null;
    dateAnnonce?: Date | null;
    idCategorie?: number | null;
    idGenres?: number[];
    idThemes?: number[];
    idProducteurs?: number[];
    idSources?: number[];
}
