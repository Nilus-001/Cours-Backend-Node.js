import {WatchlistEntity} from "../../infra/persistances/entities/watchlist.entity";
import {WatchlistToSaveInput} from "../inputs/watchlist.input";
import {IWatchlistRepository} from "../interfaces/watchlist.repository.interface";
import {getWatchlistStatut} from "../../domain/watchlist.statut";
import {AnimeNotFoundError} from "../../../anime/domain/errors/anime.errors";

export const toWatchlistInput = (idUser: number, idAnime: number, entry: WatchlistEntity | null): WatchlistToSaveInput => ({
    idAnime,
    idUser,
    dateVisionnage: entry?.dateVisionnage ?? null,
    isWatchlist: entry?.isWatchlist ?? false,
    currentWatch: entry?.currentWatch ?? null,
    ordre: entry?.ordre ?? null,
});

export const persistEntry = async (repository: IWatchlistRepository, entry: WatchlistToSaveInput): Promise<WatchlistEntity | null> => {
    if (getWatchlistStatut(entry) === null) {
        await repository.clearEntry(entry.idUser, entry.idAnime);
        return null;
    }
    return repository.saveEntry(entry);
}

export const getTrackedEntry = async (repository: IWatchlistRepository, idUser: number, idAnime: number): Promise<WatchlistEntity | null> => {
    const entry = await repository.getEntry(idUser, idAnime);
    return entry && getWatchlistStatut(entry) !== null ? entry : null;
}

export const assertAnimeExists = async (repository: IWatchlistRepository, idAnime: number): Promise<void> => {
    if (!await repository.animeExists(idAnime)) {
        throw new AnimeNotFoundError({id: idAnime});
    }
}

export const sameIds = (a: number[], b: number[]): boolean =>
    a.length === b.length && a.every((id) => b.includes(id));
