import bcrypt from "bcrypt";
import {createHash} from "crypto";
import * as userRepository from "../repositories/user.repository";
import * as refreshTokenRepository from "../repositories/refresh-token.repository";
import * as jwtService from "./jwt.service";
import {userLoginDTO} from "../types/dtos/user.dtos";
import {TokenPair} from "../types/auth.type";
import {InvalidCredentialsError, RefreshTokenInvalidError, RefreshTokenReusedError} from "../core/http/errors/auth.errors";

const hashToken = (token: string): string => createHash('sha256').update(token).digest('hex');

const generateTokens = async (userId: number, identifiant: string): Promise<TokenPair> => {
    const accessToken = jwtService.signAccessToken(userId, identifiant);
    const refreshToken = jwtService.signRefreshToken(userId);
    await refreshTokenRepository.saveRefreshToken(userId, hashToken(refreshToken), jwtService.getExpirationDate(refreshToken));
    return {accessToken, refreshToken};
}

export const login = async (credentials: userLoginDTO): Promise<TokenPair> => {
    const user = await userRepository.getUserWithPasswordByIdentifiant(credentials.identifiant);
    const passwordOk = user && await bcrypt.compare(credentials.motDePasse, user.motDePasse);
    if (!passwordOk) {
        throw new InvalidCredentialsError();
    }
    await refreshTokenRepository.deleteExpiredRefreshTokens();
    return generateTokens(user.id, user.identifiant);
}

export const refresh = async (refreshToken: string): Promise<TokenPair> => {
    let payload;
    try {
        payload = jwtService.verifyRefreshToken(refreshToken);
    } catch {
        throw new RefreshTokenInvalidError();
    }

    const stored = await refreshTokenRepository.getRefreshTokenByHash(hashToken(refreshToken));
    if (!stored) {
        await refreshTokenRepository.deleteAllRefreshTokensOfUser(payload.sub);
        throw new RefreshTokenReusedError();
    }

    await refreshTokenRepository.deleteRefreshTokenByHash(stored.tokenHash);
    return generateTokens(stored.user.id, stored.user.identifiant);
}

export const logout = async (refreshToken: string): Promise<void> => {
    await refreshTokenRepository.deleteRefreshTokenByHash(hashToken(refreshToken));
}

export const logoutAll = async (userId: number): Promise<void> => {
    await refreshTokenRepository.deleteAllRefreshTokensOfUser(userId);
}
