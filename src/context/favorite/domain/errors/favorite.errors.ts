import {DomainError} from "../../../../core/http/errorDomain";

export class FavoriteAlreadyError extends DomainError {
    constructor(meta?: any) {
        super(409, "Err-favori-exists-409", "Anime déjà en favori", meta);
    }
}

export class FavoriteNotFoundError extends DomainError {
    constructor(meta?: any) {
        super(404, "Err-favori-notfound-404", "Anime absent des favoris", meta);
    }
}

export class FavoriteOrderError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-favori-order-400", "La liste doit contenir exactement les animes favoris", meta);
    }
}
