import {IWatchlistRepository} from "../interfaces/watchlist.repository.interface";
import {TrackingNotFoundError} from "../../domain/errors/watchlist.errors";
import {getTrackedEntry} from "../utils/watchlist.utils";

export class DeleteTrackingUseCase {
    constructor(private readonly watchlistRepository: IWatchlistRepository) {}

    async execute(idUser: number, idAnime: number): Promise<void> {
        if (!await getTrackedEntry(this.watchlistRepository, idUser, idAnime)) {
            throw new TrackingNotFoundError({idAnime});
        }
        await this.watchlistRepository.clearEntry(idUser, idAnime);
    }
}
