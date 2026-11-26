import {DomainError} from "../../../../core/http/errorDomain";

export class AnimeReferenceError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-anime-reference-400", "Catégorie, genre, thème, producteur ou source inexistant", meta);
    }
}

export class AnimeNotFoundError extends DomainError {
    constructor(meta?: any) {
        super(404, "Err-anime-notfound-404", "Anime introuvable", meta);
    }
}

export class AnimeDependenciesError extends DomainError {
    constructor(meta?: any) {
        super(409, "Err-anime-dependencies-409", "Impossible de supprimer : l'anime possède des épisodes", meta);
    }
}
