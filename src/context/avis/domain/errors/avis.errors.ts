import {DomainError} from "../../../../core/http/errorDomain";

export class AvisNotFoundError extends DomainError {
    constructor(meta?: any) {
        super(404, "Err-avis-notfound-404", "Avis introuvable", meta);
    }
}

export class AvisAlreadyError extends DomainError {
    constructor(meta?: any) {
        super(409, "Err-avis-exists-409", "Vous avez déjà publié un avis sur cet anime", meta);
    }
}

export class AvisForbiddenError extends DomainError {
    constructor(meta?: any) {
        super(403, "Err-avis-forbidden-403", "Action réservée à l'auteur de l'avis ou à un modérateur", meta);
    }
}

export class AvisEmptyError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-avis-empty-400", "Au moins un champ note, commentaire ou idCategorie est requis", meta);
    }
}

export class AvisReplyFieldsError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-avis-reply-fields-400", "Une réponse ne peut contenir qu'un commentaire", meta);
    }
}

export class CategorieAppreciationNotFoundError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-categorie-appreciation-400", "Catégorie d'appréciation inexistante", meta);
    }
}
