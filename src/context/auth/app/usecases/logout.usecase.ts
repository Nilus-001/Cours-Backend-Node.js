import {IRefreshTokenRepository} from "../interfaces/refresh-token.repository.interface";
import {hashToken} from "../utils/auth.utils";
import {AccessTokenPayload} from "../interfaces/auth.type";
import {emit} from "../../../../core/events/eventBus";

export class LogoutUseCase {
    constructor(private readonly refreshTokenRepository: IRefreshTokenRepository) {}

    async execute(refreshToken: string, accessToken: AccessTokenPayload): Promise<void> {
        await this.refreshTokenRepository.deleteRefreshTokenByHash(hashToken(refreshToken));
        emit('auth.logout', {jti: accessToken.jti, exp: accessToken.exp});
    }
}
