import {db} from "../../../../../core/configs/database/typeorm.config";
import {deleteEmptyVuOrAVoir} from "../../../../../core/database/vu-or-a-voir.cleanup";
import {FavoriteEntity} from "../entities/favorite.entity";
import {AnimeEntity} from "../../../../anime/infra/persistances/entities/anime.entity";

const favoriteRepository = () => db.getRepository(FavoriteEntity);

export const getFavorites = async (idUser: number): Promise<FavoriteEntity[]> => {
    return favoriteRepository()
        .createQueryBuilder('favorite')
        .innerJoinAndSelect('favorite.anime', 'anime')
        .where('favorite.idUser = :idUser', {idUser})
        .andWhere('favorite.estFavoris = :favori', {favori: true})
        .orderBy('favorite.classementFavoris IS NULL', 'ASC')
        .addOrderBy('favorite.classementFavoris', 'ASC')
        .addOrderBy('anime.nom', 'ASC')
        .getMany();
}

export const getFavorite = async (idUser: number, idAnime: number): Promise<FavoriteEntity | null> => {
    return favoriteRepository().findOne({
        where: {idUser, idAnime, estFavoris: true},
        relations: {anime: true},
    });
}

export const addFavorite = async (idUser: number, idAnime: number, classement: number): Promise<FavoriteEntity> => {
    await favoriteRepository().upsert({
        idAnime,
        idUser,
        estFavoris: true,
        classementFavoris: classement,
    }, ['idAnime', 'idUser']);
    return getFavorite(idUser, idAnime);
}

export const removeFavorite = async (idUser: number, idAnime: number): Promise<void> => {
    await favoriteRepository().update({idUser, idAnime}, {estFavoris: false, classementFavoris: null});
    await deleteEmptyVuOrAVoir(idUser, idAnime);
}

export const getMaxClassement = async (idUser: number): Promise<number> => {
    const result = await favoriteRepository()
        .createQueryBuilder('favorite')
        .select('MAX(favorite.classementFavoris)', 'max')
        .where('favorite.idUser = :idUser', {idUser})
        .getRawOne<{max: number | string | null}>();
    return Number(result?.max ?? 0);
}

export const updateClassements = async (idUser: number, idAnimes: number[]): Promise<void> => {
    await db.transaction(async (manager) => {
        const repository = manager.getRepository(FavoriteEntity);
        for (const [index, idAnime] of idAnimes.entries()) {
            await repository.update({idUser, idAnime}, {classementFavoris: index + 1});
        }
    });
}

export const animeExists = async (idAnime: number): Promise<boolean> => {
    return db.getRepository(AnimeEntity).exists({where: {id: idAnime}});
}
