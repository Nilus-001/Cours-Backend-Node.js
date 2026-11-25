import {IRefreshTokenRepository} from "../interfaces/refresh-token.repository.interface";

export class LogoutAllUseCase {
    constructor(private readonly refreshTokenRepository: IRefreshTokenRepository) {}

    async execute(userId: number): Promise<void> {
        await this.refreshTokenRepository.deleteAllRefreshTokensOfUser(userId);
    }
}
