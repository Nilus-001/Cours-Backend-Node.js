import * as watchlistRepository from "./watchlist.repository";
import {IWatchlistRepository} from "../../../app/interfaces/watchlist.repository.interface";

export const typeWatchlistRepository: IWatchlistRepository = {
    getEntries: watchlistRepository.getEntries,
    getEntry: watchlistRepository.getEntry,
    saveEntry: watchlistRepository.saveEntry,
    clearEntry: watchlistRepository.clearEntry,
    getMaxOrdre: watchlistRepository.getMaxOrdre,
    updateOrdres: watchlistRepository.updateOrdres,
    animeExists: watchlistRepository.animeExists,
    countEpisodes: watchlistRepository.countEpisodes,
};
