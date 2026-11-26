import {IWatchlistRepository} from "../interfaces/watchlist.repository.interface";
import {WatchlistEntity} from "../../infra/persistances/entities/watchlist.entity";
import {WatchlistOrderError} from "../../domain/errors/watchlist.errors";
import {WatchlistStatut} from "../../domain/watchlist.statut";
import {sameIds} from "../utils/watchlist.utils";

export class ReorderWatchlistUseCase {
    constructor(private readonly watchlistRepository: IWatchlistRepository) {}

    async execute(idUser: number, idAnimes: number[]): Promise<WatchlistEntity[]> {
        const actuels = (await this.watchlistRepository.getEntries(idUser, {statut: WatchlistStatut.A_VOIR})).map((e) => e.idAnime);
        if (!sameIds(actuels, idAnimes)) {
            throw new WatchlistOrderError({attendus: actuels});
        }
        await this.watchlistRepository.updateOrdres(idUser, idAnimes);
        return this.watchlistRepository.getEntries(idUser, {statut: WatchlistStatut.A_VOIR});
    }
}
