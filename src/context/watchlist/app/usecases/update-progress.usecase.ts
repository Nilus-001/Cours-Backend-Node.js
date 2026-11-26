import {IWatchlistRepository} from "../interfaces/watchlist.repository.interface";
import {ProgressInput} from "../inputs/watchlist.input";
import {WatchlistEntity} from "../../infra/persistances/entities/watchlist.entity";
import {EpisodeOutOfRangeError, ProgressEmptyError} from "../../domain/errors/watchlist.errors";
import {getWatchlistStatut, WatchlistStatut} from "../../domain/watchlist.statut";
import {assertAnimeExists, persistEntry, toWatchlistInput} from "../utils/watchlist.utils";

export class UpdateProgressUseCase {
    constructor(private readonly watchlistRepository: IWatchlistRepository) {}

    async execute(idUser: number, idAnime: number, progress: ProgressInput): Promise<WatchlistEntity | null> {
        if (progress.episode === undefined && progress.termine === undefined) {
            throw new ProgressEmptyError();
        }
        await assertAnimeExists(this.watchlistRepository, idAnime);

        const totalEpisodes = await this.watchlistRepository.countEpisodes(idAnime);
        const episode = progress.episode ?? null;
        if (episode !== null && totalEpisodes > 0 && episode > totalEpisodes) {
            throw new EpisodeOutOfRangeError({episode, totalEpisodes});
        }

        const existant = await this.watchlistRepository.getEntry(idUser, idAnime);
        const entry = toWatchlistInput(idUser, idAnime, existant);

        if (progress.episode !== undefined) {
            entry.currentWatch = episode;
        }

        const termine = progress.termine ?? (episode !== null && totalEpisodes > 0 && episode === totalEpisodes ? true : undefined);
        if (termine === true) {
            entry.dateVisionnage = entry.dateVisionnage ?? new Date();
            if (entry.currentWatch === null && totalEpisodes > 0) {
                entry.currentWatch = totalEpisodes;
            }
        }
        if (termine === false) {
            entry.dateVisionnage = null;
        }

        const statut = getWatchlistStatut(entry);
        if (statut === WatchlistStatut.EN_COURS || statut === WatchlistStatut.VU) {
            entry.isWatchlist = false;
            entry.ordre = null;
        }

        return persistEntry(this.watchlistRepository, entry);
    }
}
