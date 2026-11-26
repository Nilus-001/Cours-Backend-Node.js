import {IWatchlistRepository} from "../interfaces/watchlist.repository.interface";
import {WatchlistEntity} from "../../infra/persistances/entities/watchlist.entity";
import {TrackingNotFoundError} from "../../domain/errors/watchlist.errors";
import {getTrackedEntry} from "../utils/watchlist.utils";

export class GetTrackingUseCase {
    constructor(private readonly watchlistRepository: IWatchlistRepository) {}

    async execute(idUser: number, idAnime: number): Promise<WatchlistEntity> {
        const entry = await getTrackedEntry(this.watchlistRepository, idUser, idAnime);
        if (!entry) {
            throw new TrackingNotFoundError({idAnime});
        }
        return entry;
    }
}
