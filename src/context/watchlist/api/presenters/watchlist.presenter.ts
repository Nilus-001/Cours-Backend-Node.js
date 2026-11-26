import {WatchlistEntity} from "../../infra/persistances/entities/watchlist.entity";
import {DomainResponse} from "../../../../core/http/successDomain";
import {WatchlistFilterInput} from "../../app/inputs/watchlist.input";
import {getWatchlistStatut, WatchlistStatut} from "../../domain/watchlist.statut";

export class WatchlistAnimePresenter {
    id!: number;
    nom!: string;
    image!: string | null;
}

export class WatchlistPresenter {
    anime!: WatchlistAnimePresenter;
    statut!: WatchlistStatut;
    episodeActuel!: number | null;
    dateVisionnage!: string | null;
    ordre!: number | null;
}

export class WatchlistFilterPresenter {
    statut!: WatchlistStatut | null;
}

export class WatchlistListMeta {
    filtres!: WatchlistFilterPresenter;
    total!: number;
}

const toDateString = (date: Date | string | null | undefined): string | null => {
    if (!date) return null;
    return date instanceof Date ? date.toISOString().split('T')[0] : date;
}

export const toWatchlistPresenter = (entry: WatchlistEntity): WatchlistPresenter => ({
    anime: {id: entry.anime.id, nom: entry.anime.nom, image: entry.anime.image ?? null},
    statut: getWatchlistStatut(entry),
    episodeActuel: entry.currentWatch ?? null,
    dateVisionnage: toDateString(entry.dateVisionnage),
    ordre: entry.ordre ?? null,
});

export const toWatchlistListPresenter = (filters: WatchlistFilterInput, entries: WatchlistEntity[]): DomainResponse<WatchlistPresenter[], WatchlistListMeta> =>
    new DomainResponse(entries.map(toWatchlistPresenter), {
        filtres: {statut: filters.statut ?? null},
        total: entries.length,
    });
