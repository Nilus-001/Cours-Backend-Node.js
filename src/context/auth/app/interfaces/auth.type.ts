export type AccessTokenPayload = {
    sub: number;
    identifiant: string;
    perm: bigint;
    jti: string;
    iat: number;
    exp: number;
}

export type RefreshTokenPayload = {
    sub: number;
    jti: string;
}

export type TokenPair = {
    accessToken: string;
    refreshToken: string;
}
