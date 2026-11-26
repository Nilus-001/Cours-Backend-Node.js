import {WatchlistStatut} from "../../domain/watchlist.statut";

export class WatchlistToSaveInput {
    idAnime!: number;
    idUser!: number;
    dateVisionnage!: Date | string | null;
    isWatchlist!: boolean;
    currentWatch!: number | null;
    ordre!: number | null;
}

export class WatchlistFilterInput {
    statut?: WatchlistStatut;
}

export class ProgressInput {
    episode?: number | null;
    termine?: boolean;
}
