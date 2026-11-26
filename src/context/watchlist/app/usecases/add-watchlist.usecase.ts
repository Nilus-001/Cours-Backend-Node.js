import {IWatchlistRepository} from "../interfaces/watchlist.repository.interface";
import {WatchlistEntity} from "../../infra/persistances/entities/watchlist.entity";
import {WatchlistAlreadyError, WatchlistStartedError} from "../../domain/errors/watchlist.errors";
import {getWatchlistStatut, WatchlistStatut} from "../../domain/watchlist.statut";
import {assertAnimeExists, toWatchlistInput} from "../utils/watchlist.utils";

export class AddWatchlistUseCase {
    constructor(private readonly watchlistRepository: IWatchlistRepository) {}

    async execute(idUser: number, idAnime: number): Promise<WatchlistEntity> {
        await assertAnimeExists(this.watchlistRepository, idAnime);
        const existant = await this.watchlistRepository.getEntry(idUser, idAnime);
        const statut = existant ? getWatchlistStatut(existant) : null;

        if (statut === WatchlistStatut.A_VOIR) {
            throw new WatchlistAlreadyError({idAnime});
        }
        if (statut === WatchlistStatut.EN_COURS || statut === WatchlistStatut.VU) {
            throw new WatchlistStartedError({idAnime, statut});
        }

        const entry = toWatchlistInput(idUser, idAnime, existant);
        entry.isWatchlist = true;
        entry.ordre = await this.watchlistRepository.getMaxOrdre(idUser) + 1;
        return this.watchlistRepository.saveEntry(entry);
    }
}
