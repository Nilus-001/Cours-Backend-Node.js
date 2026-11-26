import {db} from "../../../../../core/configs/database/typeorm.config";
import {VuOrAVoirEntity} from "../entities/vu-or-a-voir.entity";
import {AnimeEntity} from "../../../../anime/infra/persistances/entities/anime.entity";
import {EpisodeEntity} from "../../../../anime/infra/persistances/entities/episode.entity";
import {SuiviFilterInput, SuiviToSaveInput} from "../../../app/inputs/suivi.input";
import {SuiviStatut} from "../../../domain/suivi.statut";

const suiviRepository = () => db.getRepository(VuOrAVoirEntity);

export const getSuivis = async (idUser: number, filters: SuiviFilterInput): Promise<VuOrAVoirEntity[]> => {
    const query = suiviRepository()
        .createQueryBuilder('suivi')
        .innerJoinAndSelect('suivi.anime', 'anime')
        .where('suivi.idUser = :idUser', {idUser});

    if (filters.statut === SuiviStatut.VU) {
        query.andWhere('suivi.dateVisionnage IS NOT NULL');
    }
    if (filters.statut === SuiviStatut.EN_COURS) {
        query.andWhere('suivi.dateVisionnage IS NULL AND suivi.currentWatch IS NOT NULL');
    }
    if (filters.statut === SuiviStatut.A_VOIR) {
        query.andWhere('suivi.dateVisionnage IS NULL AND suivi.currentWatch IS NULL AND suivi.isWatchlist = :watchlist', {watchlist: true});
    }
    if (filters.favori !== undefined) {
        query.andWhere('suivi.estFavoris = :favori', {favori: filters.favori});
    }

    if (filters.favori) {
        query.orderBy('suivi.classementFavoris IS NULL', 'ASC').addOrderBy('suivi.classementFavoris', 'ASC');
    } else {
        query.orderBy('suivi.ordre IS NULL', 'ASC').addOrderBy('suivi.ordre', 'ASC');
    }

    return query.addOrderBy('anime.nom', 'ASC').getMany();
}

export const getSuivi = async (idUser: number, idAnime: number): Promise<VuOrAVoirEntity | null> => {
    return suiviRepository().findOne({
        where: {idUser, idAnime},
        relations: {anime: true},
    });
}

export const saveSuivi = async (suivi: SuiviToSaveInput): Promise<VuOrAVoirEntity> => {
    await suiviRepository().save({
        idAnime: suivi.idAnime,
        idUser: suivi.idUser,
        dateVisionnage: suivi.dateVisionnage,
        isWatchlist: suivi.isWatchlist,
        currentWatch: suivi.currentWatch,
        ordre: suivi.ordre,
        estFavoris: suivi.estFavoris,
        classementFavoris: suivi.classementFavoris,
    });
    return getSuivi(suivi.idUser, suivi.idAnime);
}

export const deleteSuivi = async (idUser: number, idAnime: number): Promise<void> => {
    await suiviRepository().delete({idUser, idAnime});
}

const getMax = async (idUser: number, column: 'ordre' | 'classementFavoris'): Promise<number> => {
    const result = await suiviRepository()
        .createQueryBuilder('suivi')
        .select(`MAX(suivi.${column})`, 'max')
        .where('suivi.idUser = :idUser', {idUser})
        .getRawOne<{max: number | string | null}>();
    return Number(result?.max ?? 0);
}

export const getMaxOrdre = (idUser: number): Promise<number> => getMax(idUser, 'ordre');

export const getMaxClassementFavoris = (idUser: number): Promise<number> => getMax(idUser, 'classementFavoris');

const updatePositions = async (idUser: number, idAnimes: number[], column: 'ordre' | 'classementFavoris'): Promise<void> => {
    await db.transaction(async (manager) => {
        const repository = manager.getRepository(VuOrAVoirEntity);
        for (const [index, idAnime] of idAnimes.entries()) {
            await repository.update({idUser, idAnime}, {[column]: index + 1});
        }
    });
}

export const updateOrdres = (idUser: number, idAnimes: number[]): Promise<void> => updatePositions(idUser, idAnimes, 'ordre');

export const updateClassementsFavoris = (idUser: number, idAnimes: number[]): Promise<void> => updatePositions(idUser, idAnimes, 'classementFavoris');

export const animeExists = async (idAnime: number): Promise<boolean> => {
    return db.getRepository(AnimeEntity).exists({where: {id: idAnime}});
}

export const countEpisodes = async (idAnime: number): Promise<number> => {
    return db.getRepository(EpisodeEntity).count({where: {anime: {id: idAnime}}});
}
