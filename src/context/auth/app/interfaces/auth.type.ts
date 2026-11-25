export type AccessTokenPayload = {
    sub: number;
    identifiant: string;
}

export type RefreshTokenPayload = {
    sub: number;
    jti: string;
}

export type TokenPair = {
    accessToken: string;
    refreshToken: string;
}
