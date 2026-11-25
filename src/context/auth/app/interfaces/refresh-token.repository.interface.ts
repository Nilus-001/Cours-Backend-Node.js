import {RefreshTokenEntity} from "../../infra/persistances/entities/refresh-token.entity";

export interface IRefreshTokenRepository {
    saveRefreshToken(userId: number, tokenHash: string, dateExpiration: Date): Promise<void>;
    getRefreshTokenByHash(tokenHash: string): Promise<RefreshTokenEntity | null>;
    deleteRefreshTokenByHash(tokenHash: string): Promise<boolean>;
    deleteAllRefreshTokensOfUser(userId: number): Promise<void>;
    deleteExpiredRefreshTokens(): Promise<void>;
}
