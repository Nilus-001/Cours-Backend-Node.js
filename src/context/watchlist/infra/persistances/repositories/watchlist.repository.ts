import {db} from "../../../../../core/configs/database/typeorm.config";
import {deleteEmptyVuOrAVoir} from "../../../../../core/database/vu-or-a-voir.cleanup";
import {WatchlistEntity} from "../entities/watchlist.entity";
import {AnimeEntity} from "../../../../anime/infra/persistances/entities/anime.entity";
import {EpisodeEntity} from "../../../../anime/infra/persistances/entities/episode.entity";
import {WatchlistFilterInput, WatchlistToSaveInput} from "../../../app/inputs/watchlist.input";
import {WatchlistStatut} from "../../../domain/watchlist.statut";

const watchlistRepository = () => db.getRepository(WatchlistEntity);

export const getEntries = async (idUser: number, filters: WatchlistFilterInput): Promise<WatchlistEntity[]> => {
    const query = watchlistRepository()
        .createQueryBuilder('entry')
        .innerJoinAndSelect('entry.anime', 'anime')
        .where('entry.idUser = :idUser', {idUser});

    if (filters.statut === WatchlistStatut.VU) {
        query.andWhere('entry.dateVisionnage IS NOT NULL');
    } else if (filters.statut === WatchlistStatut.EN_COURS) {
        query.andWhere('entry.dateVisionnage IS NULL AND entry.currentWatch IS NOT NULL');
    } else if (filters.statut === WatchlistStatut.A_VOIR) {
        query.andWhere('entry.dateVisionnage IS NULL AND entry.currentWatch IS NULL AND entry.isWatchlist = :watchlist', {watchlist: true});
    } else {
        query.andWhere('(entry.dateVisionnage IS NOT NULL OR entry.currentWatch IS NOT NULL OR entry.isWatchlist = :watchlist)', {watchlist: true});
    }

    return query
        .orderBy('entry.ordre IS NULL', 'ASC')
        .addOrderBy('entry.ordre', 'ASC')
        .addOrderBy('anime.nom', 'ASC')
        .getMany();
}

export const getEntry = async (idUser: number, idAnime: number): Promise<WatchlistEntity | null> => {
    return watchlistRepository().findOne({
        where: {idUser, idAnime},
        relations: {anime: true},
    });
}

export const saveEntry = async (entry: WatchlistToSaveInput): Promise<WatchlistEntity> => {
    await watchlistRepository().upsert({
        idAnime: entry.idAnime,
        idUser: entry.idUser,
        dateVisionnage: entry.dateVisionnage,
        isWatchlist: entry.isWatchlist,
        currentWatch: entry.currentWatch,
        ordre: entry.ordre,
    }, ['idAnime', 'idUser']);
    return getEntry(entry.idUser, entry.idAnime);
}

export const clearEntry = async (idUser: number, idAnime: number): Promise<void> => {
    await watchlistRepository().update({idUser, idAnime}, {
        dateVisionnage: null,
        isWatchlist: false,
        currentWatch: null,
        ordre: null,
    });
    await deleteEmptyVuOrAVoir(idUser, idAnime);
}

export const getMaxOrdre = async (idUser: number): Promise<number> => {
    const result = await watchlistRepository()
        .createQueryBuilder('entry')
        .select('MAX(entry.ordre)', 'max')
        .where('entry.idUser = :idUser', {idUser})
        .getRawOne<{max: number | string | null}>();
    return Number(result?.max ?? 0);
}

export const updateOrdres = async (idUser: number, idAnimes: number[]): Promise<void> => {
    await db.transaction(async (manager) => {
        const repository = manager.getRepository(WatchlistEntity);
        for (const [index, idAnime] of idAnimes.entries()) {
            await repository.update({idUser, idAnime}, {ordre: index + 1});
        }
    });
}

export const animeExists = async (idAnime: number): Promise<boolean> => {
    return db.getRepository(AnimeEntity).exists({where: {id: idAnime}});
}

export const countEpisodes = async (idAnime: number): Promise<number> => {
    return db.getRepository(EpisodeEntity).count({where: {anime: {id: idAnime}}});
}
