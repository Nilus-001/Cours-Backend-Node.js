import {RefreshTokenPayload} from "./auth.type";

export interface ITokenService {
    signAccessToken(userId: number, identifiant: string, perm: bigint): string;
    signRefreshToken(userId: number): string;
    verifyRefreshToken(token: string): RefreshTokenPayload;
    getExpirationDate(token: string): Date;
}
