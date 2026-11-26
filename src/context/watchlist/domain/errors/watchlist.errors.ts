import {DomainError} from "../../../../core/http/errorDomain";

export class TrackingNotFoundError extends DomainError {
    constructor(meta?: any) {
        super(404, "Err-suivi-notfound-404", "Cet anime n'est pas suivi", meta);
    }
}

export class WatchlistAlreadyError extends DomainError {
    constructor(meta?: any) {
        super(409, "Err-watchlist-exists-409", "Anime déjà dans la watchlist", meta);
    }
}

export class WatchlistStartedError extends DomainError {
    constructor(meta?: any) {
        super(409, "Err-watchlist-started-409", "Anime déjà commencé ou vu", meta);
    }
}

export class WatchlistNotFoundError extends DomainError {
    constructor(meta?: any) {
        super(404, "Err-watchlist-notfound-404", "Anime absent de la watchlist", meta);
    }
}

export class WatchlistOrderError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-watchlist-order-400", "La liste doit contenir exactement les animes à voir", meta);
    }
}

export class EpisodeOutOfRangeError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-episode-range-400", "Numéro d'épisode supérieur au nombre d'épisodes", meta);
    }
}

export class ProgressEmptyError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-progress-empty-400", "Au moins un champ episode ou termine est requis", meta);
    }
}
