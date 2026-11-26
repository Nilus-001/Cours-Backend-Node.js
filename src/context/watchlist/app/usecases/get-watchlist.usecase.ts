import {IWatchlistRepository} from "../interfaces/watchlist.repository.interface";
import {WatchlistFilterInput} from "../inputs/watchlist.input";
import {WatchlistEntity} from "../../infra/persistances/entities/watchlist.entity";

export class GetWatchlistUseCase {
    constructor(private readonly watchlistRepository: IWatchlistRepository) {}

    async execute(idUser: number, filters: WatchlistFilterInput): Promise<WatchlistEntity[]> {
        return this.watchlistRepository.getEntries(idUser, filters);
    }
}
