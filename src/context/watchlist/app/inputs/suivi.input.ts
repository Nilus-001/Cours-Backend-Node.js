import {SuiviStatut} from "../../domain/suivi.statut";

export class SuiviToSaveInput {
    idAnime!: number;
    idUser!: number;
    dateVisionnage!: Date | null;
    isWatchlist!: boolean;
    currentWatch!: number | null;
    ordre!: number | null;
    estFavoris!: boolean;
    classementFavoris!: number | null;
}

export class SuiviFilterInput {
    statut?: SuiviStatut;
    favori?: boolean;
}

export class ProgressInput {
    episode?: number | null;
    termine?: boolean;
}
