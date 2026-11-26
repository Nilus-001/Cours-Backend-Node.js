import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {WatchlistNotFoundError} from "../../domain/errors/watchlist.errors";
import {persistSuivi, toSuiviInput} from "../utils/suivi.utils";

export class RemoveWatchlistUseCase {
    constructor(private readonly suiviRepository: ISuiviRepository) {}

    async execute(idUser: number, idAnime: number): Promise<void> {
        const existant = await this.suiviRepository.getSuivi(idUser, idAnime);
        if (!existant?.isWatchlist) {
            throw new WatchlistNotFoundError({idAnime});
        }
        const suivi = toSuiviInput(idUser, idAnime, existant);
        suivi.isWatchlist = false;
        suivi.ordre = null;
        await persistSuivi(this.suiviRepository, suivi);
    }
}
