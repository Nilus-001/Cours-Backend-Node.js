import {IWatchlistRepository} from "../interfaces/watchlist.repository.interface";
import {WatchlistNotFoundError} from "../../domain/errors/watchlist.errors";
import {getWatchlistStatut, WatchlistStatut} from "../../domain/watchlist.statut";
import {persistEntry, toWatchlistInput} from "../utils/watchlist.utils";

export class RemoveWatchlistUseCase {
    constructor(private readonly watchlistRepository: IWatchlistRepository) {}

    async execute(idUser: number, idAnime: number): Promise<void> {
        const existant = await this.watchlistRepository.getEntry(idUser, idAnime);
        if (!existant || getWatchlistStatut(existant) !== WatchlistStatut.A_VOIR) {
            throw new WatchlistNotFoundError({idAnime});
        }
        const entry = toWatchlistInput(idUser, idAnime, existant);
        entry.isWatchlist = false;
        entry.ordre = null;
        await persistEntry(this.watchlistRepository, entry);
    }
}
