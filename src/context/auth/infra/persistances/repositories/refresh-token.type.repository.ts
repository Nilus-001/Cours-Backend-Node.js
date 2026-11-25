import * as refreshTokenRepository from "./refresh-token.repository";
import {IRefreshTokenRepository} from "../../../app/interfaces/refresh-token.repository.interface";

export const typeRefreshTokenRepository: IRefreshTokenRepository = {
    saveRefreshToken: refreshTokenRepository.saveRefreshToken,
    getRefreshTokenByHash: refreshTokenRepository.getRefreshTokenByHash,
    deleteRefreshTokenByHash: refreshTokenRepository.deleteRefreshTokenByHash,
    deleteAllRefreshTokensOfUser: refreshTokenRepository.deleteAllRefreshTokensOfUser,
    deleteExpiredRefreshTokens: refreshTokenRepository.deleteExpiredRefreshTokens,
};
