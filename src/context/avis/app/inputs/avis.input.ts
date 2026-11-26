export class AvisToCreateInput {
    note!: number;
    commentaire?: string | null;
    idCategorie?: number | null;
}

export class ReponseToCreateInput {
    commentaire!: string;
}

export class AvisToUpdateInput {
    note?: number;
    commentaire?: string | null;
    idCategorie?: number | null;
}

export class AvisToSaveInput {
    id?: number;
    idAnime!: number;
    idUser!: number;
    idAvisParent!: number | null;
    noteUser!: number | null;
    commentaire!: string | null;
    idCategorie!: number | null;
    dateAvis!: Date | string | null;
}

export class AvisActorInput {
    idUser!: number;
    perm!: bigint;
}

export class NoteStatsInput {
    moyenne!: number | null;
    nombre!: number;
}
