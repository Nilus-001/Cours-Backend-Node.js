import {IsNull} from "typeorm";
import {db} from "../../../../../core/configs/database/typeorm.config";
import {AvisEntity} from "../entities/avis.entity";
import {CategorieAppreciationEntity} from "../entities/categorie-appreciation.entity";
import {AnimeEntity} from "../../../../anime/infra/persistances/entities/anime.entity";
import {AvisToSaveInput, NoteStatsInput} from "../../../app/inputs/avis.input";

const avisRepository = () => db.getRepository(AvisEntity);

const relations = {user: true, categorieAppreciation: true, anime: true};

export const getAvisByAnime = async (idAnime: number): Promise<AvisEntity[]> => {
    return avisRepository().find({
        where: {idAnime},
        relations,
        order: {dateAvis: 'ASC', id: 'ASC'},
    });
}

export const getAvisByUser = async (idUser: number): Promise<AvisEntity[]> => {
    return avisRepository().find({
        where: {idUser},
        relations,
        order: {dateAvis: 'DESC', id: 'DESC'},
    });
}

export const getAvisById = async (id: number): Promise<AvisEntity | null> => {
    return avisRepository().findOne({where: {id}, relations});
}

export const getAvisRacine = async (idUser: number, idAnime: number): Promise<AvisEntity | null> => {
    return avisRepository().findOne({where: {idUser, idAnime, idAvisParent: IsNull()}, relations});
}

export const saveAvis = async (avis: AvisToSaveInput): Promise<AvisEntity> => {
    const saved = await avisRepository().save({
        id: avis.id,
        idAnime: avis.idAnime,
        idUser: avis.idUser,
        idAvisParent: avis.idAvisParent,
        noteUser: avis.noteUser,
        commentaire: avis.commentaire,
        idCategorie: avis.idCategorie,
        dateAvis: avis.dateAvis,
    });
    return getAvisById(saved.id);
}

export const deleteAvis = async (id: number): Promise<void> => {
    await avisRepository().delete({id});
}

export const getNoteStats = async (idAnime: number): Promise<NoteStatsInput> => {
    const result = await avisRepository()
        .createQueryBuilder('avis')
        .select('AVG(avis.noteUser)', 'moyenne')
        .addSelect('COUNT(avis.noteUser)', 'nombre')
        .where('avis.idAnime = :idAnime', {idAnime})
        .andWhere('avis.idAvisParent IS NULL')
        .andWhere('avis.noteUser IS NOT NULL')
        .getRawOne<{moyenne: string | number | null, nombre: string | number}>();
    const nombre = Number(result?.nombre ?? 0);
    return {
        moyenne: nombre > 0 ? Math.round(Number(result.moyenne) * 100) / 100 : null,
        nombre,
    };
}

export const getCategories = async (): Promise<CategorieAppreciationEntity[]> => {
    return db.getRepository(CategorieAppreciationEntity).find({order: {id: 'ASC'}});
}

export const categorieExists = async (idCategorie: number): Promise<boolean> => {
    return db.getRepository(CategorieAppreciationEntity).exists({where: {id: idCategorie}});
}

export const animeExists = async (idAnime: number): Promise<boolean> => {
    return db.getRepository(AnimeEntity).exists({where: {id: idAnime}});
}
