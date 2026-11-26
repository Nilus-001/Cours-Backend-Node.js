import {IRefreshTokenRepository} from "../interfaces/refresh-token.repository.interface";
import {emit} from "../../../../core/events/eventBus";

export class LogoutAllUseCase {
    constructor(private readonly refreshTokenRepository: IRefreshTokenRepository) {}

    async execute(userId: number): Promise<void> {
        await this.refreshTokenRepository.deleteAllRefreshTokensOfUser(userId);
        emit('auth.logout-all', {userId});
    }
}
