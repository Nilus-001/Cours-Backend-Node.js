import {DomainError} from "../errorDomain";

export class UnknownError extends DomainError {
    constructor(meta?: any) {
        super(500, "Err-unknown-500", "Internal server error", meta);
    }
}

export class ValidateError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-validate-400", "Validation failed", meta);
    }
}

export class InvalidJsonError extends DomainError {
    constructor(meta?: any) {
        super(400, "Err-json-invalid-400", "Corps de la requête JSON invalide", meta);
    }
}

export class RouteNotFoundError extends DomainError {
    constructor(meta?: any) {
        super(404, "Err-route-notfound-404", "Route introuvable", meta);
    }
}

export class PermissionDeniedError extends DomainError {
    constructor(meta?: any) {
        super(403, "Err-permission-denied-403", "Permission insuffisante", meta);
    }
}
