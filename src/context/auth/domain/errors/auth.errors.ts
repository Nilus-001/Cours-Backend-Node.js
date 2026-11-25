import {DomainError} from "../../../../core/http/errorDomain";

export class TokenMissingError extends DomainError {
    constructor(meta?: any) {
        super(401, "Err-token-missing-401", "Token d'accès manquant", meta);
    }
}

export class TokenExpiredError extends DomainError {
    constructor(meta?: any) {
        super(401, "Err-token-expired-401", "Token d'accès expiré", meta);
    }
}

export class TokenInvalidError extends DomainError {
    constructor(meta?: any) {
        super(401, "Err-token-invalid-401", "Token d'accès invalide", meta);
    }
}

export class InvalidCredentialsError extends DomainError {
    constructor(meta?: any) {
        super(401, "Err-auth-credentials-401", "Identifiant ou mot de passe incorrect", meta);
    }
}

export class RefreshTokenInvalidError extends DomainError {
    constructor(meta?: any) {
        super(401, "Err-refresh-invalid-401", "Refresh token invalide ou expiré", meta);
    }
}

export class RefreshTokenReusedError extends DomainError {
    constructor(meta?: any) {
        super(401, "Err-refresh-reused-401", "Refresh token déjà utilisé, toutes les sessions ont été fermées", meta);
    }
}

export class AccountForbiddenError extends DomainError {
    constructor(meta?: any) {
        super(403, "Err-account-forbidden-403", "Vous ne pouvez agir que sur votre propre compte", meta);
    }
}
