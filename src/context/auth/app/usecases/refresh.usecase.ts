import {IRefreshTokenRepository} from "../interfaces/refresh-token.repository.interface";
import {ITokenService} from "../interfaces/token.service.interface";
import {TokenPair} from "../interfaces/auth.type";
import {RefreshTokenInvalidError, RefreshTokenReusedError} from "../../domain/errors/auth.errors";
import {generateTokens, hashToken} from "../utils/auth.utils";

export class RefreshUseCase {
    constructor(
        private readonly refreshTokenRepository: IRefreshTokenRepository,
        private readonly tokenService: ITokenService,
    ) {}

    async execute(refreshToken: string): Promise<TokenPair> {
        let payload;
        try {
            payload = this.tokenService.verifyRefreshToken(refreshToken);
        } catch {
            throw new RefreshTokenInvalidError();
        }

        const stored = await this.refreshTokenRepository.getRefreshTokenByHash(hashToken(refreshToken));
        if (!stored) {
            await this.refreshTokenRepository.deleteAllRefreshTokensOfUser(payload.sub);
            throw new RefreshTokenReusedError();
        }

        await this.refreshTokenRepository.deleteRefreshTokenByHash(stored.tokenHash);
        return generateTokens(this.refreshTokenRepository, this.tokenService, stored.user.id, stored.user.identifiant, stored.user.perm);
    }
}
