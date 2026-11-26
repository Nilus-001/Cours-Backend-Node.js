export const WatchlistStatut = Object.freeze({
    A_VOIR: 'a_voir',
    EN_COURS: 'en_cours',
    VU: 'vu',
} as const);

export type WatchlistStatut = typeof WatchlistStatut[keyof typeof WatchlistStatut];

export const WATCHLIST_STATUTS = Object.values(WatchlistStatut);

type WatchlistState = {
    dateVisionnage: Date | string | null;
    currentWatch: number | null;
    isWatchlist: boolean;
};

export const getWatchlistStatut = (entry: WatchlistState): WatchlistStatut | null => {
    if (entry.dateVisionnage) return WatchlistStatut.VU;
    if (entry.currentWatch !== null && entry.currentWatch !== undefined) return WatchlistStatut.EN_COURS;
    if (entry.isWatchlist) return WatchlistStatut.A_VOIR;
    return null;
}
