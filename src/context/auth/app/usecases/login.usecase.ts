import bcrypt from "bcrypt";
import {IAuthUserRepository} from "../interfaces/auth-user.repository.interface";
import {IRefreshTokenRepository} from "../interfaces/refresh-token.repository.interface";
import {ITokenService} from "../interfaces/token.service.interface";
import {TokenPair} from "../interfaces/auth.type";
import {loginInput} from "../inputs/auth.input";
import {InvalidCredentialsError} from "../../domain/errors/auth.errors";
import {generateTokens} from "../utils/auth.utils";

export class LoginUseCase {
    constructor(
        private readonly authUserRepository: IAuthUserRepository,
        private readonly refreshTokenRepository: IRefreshTokenRepository,
        private readonly tokenService: ITokenService,
    ) {}

    async execute(credentials: loginInput): Promise<TokenPair> {
        const user = await this.authUserRepository.getUserWithPasswordByIdentifiant(credentials.identifiant);
        const passwordOk = user && await bcrypt.compare(credentials.motDePasse, user.motDePasse);
        if (!passwordOk) {
            throw new InvalidCredentialsError();
        }
        await this.refreshTokenRepository.deleteExpiredRefreshTokens();
        return generateTokens(this.refreshTokenRepository, this.tokenService, user.id, user.identifiant);
    }
}
