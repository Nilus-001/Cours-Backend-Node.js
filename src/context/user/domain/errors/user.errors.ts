import {DomainError} from "../../../../core/http/errorDomain";

export class UserNotFoundError extends DomainError {
    constructor(meta?: any) {
        super(404, "Err-user-notfound-404", "Utilisateur introuvable", meta);
    }
}

export class UserIdentifiantUsedError extends DomainError {
    constructor(meta?: any) {
        super(409, "Err-user-identifiant-409", "Cet identifiant est déjà utilisé", meta);
    }
}

export class UserDependenciesError extends DomainError {
    constructor(meta?: any) {
        super(409, "Err-user-dependencies-409", "Impossible de supprimer : l'utilisateur a des avis ou des animes dans sa liste", meta);
    }
}

export class UserPermInvalidError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-user-perm-invalid-400", "Permission inconnue", meta);
    }
}
