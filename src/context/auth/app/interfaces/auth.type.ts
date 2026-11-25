export type AccessTokenPayload = {
    sub: number;
    identifiant: string;
    perm: bigint;
}

export type RefreshTokenPayload = {
    sub: number;
    jti: string;
}

export type TokenPair = {
    accessToken: string;
    refreshToken: string;
}
