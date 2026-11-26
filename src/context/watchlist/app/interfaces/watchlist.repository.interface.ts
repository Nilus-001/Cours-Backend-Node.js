import {WatchlistEntity} from "../../infra/persistances/entities/watchlist.entity";
import {WatchlistFilterInput, WatchlistToSaveInput} from "../inputs/watchlist.input";

export interface IWatchlistRepository {
    getEntries(idUser: number, filters: WatchlistFilterInput): Promise<WatchlistEntity[]>;
    getEntry(idUser: number, idAnime: number): Promise<WatchlistEntity | null>;
    saveEntry(entry: WatchlistToSaveInput): Promise<WatchlistEntity>;
    clearEntry(idUser: number, idAnime: number): Promise<void>;
    getMaxOrdre(idUser: number): Promise<number>;
    updateOrdres(idUser: number, idAnimes: number[]): Promise<void>;
    animeExists(idAnime: number): Promise<boolean>;
    countEpisodes(idAnime: number): Promise<number>;
}
