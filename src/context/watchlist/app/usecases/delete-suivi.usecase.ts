import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {SuiviNotFoundError} from "../../domain/errors/watchlist.errors";

export class DeleteSuiviUseCase {
    constructor(private readonly suiviRepository: ISuiviRepository) {}

    async execute(idUser: number, idAnime: number): Promise<void> {
        const suivi = await this.suiviRepository.getSuivi(idUser, idAnime);
        if (!suivi) {
            throw new SuiviNotFoundError({idAnime});
        }
        await this.suiviRepository.deleteSuivi(idUser, idAnime);
    }
}
