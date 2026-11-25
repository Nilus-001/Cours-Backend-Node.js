import {IRefreshTokenRepository} from "../interfaces/refresh-token.repository.interface";
import {hashToken} from "../utils/auth.utils";

export class LogoutUseCase {
    constructor(private readonly refreshTokenRepository: IRefreshTokenRepository) {}

    async execute(refreshToken: string): Promise<void> {
        await this.refreshTokenRepository.deleteRefreshTokenByHash(hashToken(refreshToken));
    }
}
