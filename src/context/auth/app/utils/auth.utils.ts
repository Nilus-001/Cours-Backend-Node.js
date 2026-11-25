import {createHash} from "crypto";
import {IRefreshTokenRepository} from "../interfaces/refresh-token.repository.interface";
import {ITokenService} from "../interfaces/token.service.interface";
import {TokenPair} from "../interfaces/auth.type";

export const hashToken = (token: string): string => createHash('sha256').update(token).digest('hex');

export const generateTokens = async (refreshTokenRepository: IRefreshTokenRepository, tokenService: ITokenService, userId: number, identifiant: string): Promise<TokenPair> => {
    const accessToken = tokenService.signAccessToken(userId, identifiant);
    const refreshToken = tokenService.signRefreshToken(userId);
    await refreshTokenRepository.saveRefreshToken(userId, hashToken(refreshToken), tokenService.getExpirationDate(refreshToken));
    return {accessToken, refreshToken};
}
