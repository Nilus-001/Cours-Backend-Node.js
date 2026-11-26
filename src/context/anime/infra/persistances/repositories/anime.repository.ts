import {DeepPartial} from "typeorm";
import {db} from "../../../../../core/configs/database/typeorm.config";
import {AnimeEntity} from "../entities/anime.entity";
import {AnimeToCreateInput, AnimeToUpdateInput} from "../../../app/inputs/anime.input";
import {AnimeFilterInput} from "../../../app/inputs/animeFilter.input";

const animeRepository = () => db.getRepository(AnimeEntity);

export const getAnimes = async (filters: AnimeFilterInput): Promise<AnimeEntity[]> => {
    const query = animeRepository()
        .createQueryBuilder('anime')
        .leftJoinAndSelect('anime.categorie', 'categorie')
        .leftJoinAndSelect('anime.genres', 'genre')
        .leftJoinAndSelect('anime.themes', 'theme')
        .leftJoinAndSelect('anime.producteurs', 'producteur')
        .leftJoinAndSelect('anime.sources', 'source')
        .leftJoinAndSelect('source.type', 'type')
        .orderBy('anime.nom', 'ASC');

    if (filters.nom) {
        query.andWhere('LOWER(anime.nom) LIKE LOWER(:nom)', {nom: `%${filters.nom}%`});
    }
    if (filters.dateAnnonce) {
        query.andWhere('anime.dateAnnonce = :dateAnnonce', {dateAnnonce: filters.dateAnnonce});
    }
    if (filters.idCategorie) {
        query.andWhere('categorie.id = :idCategorie', {idCategorie: filters.idCategorie});
    }
    if (filters.idGenre) {
        query.andWhere('anime.id IN (SELECT ea.id_anime FROM est_attribuee ea WHERE ea.id_genre = :idGenre)', {idGenre: filters.idGenre});
    }
    if (filters.idTheme) {
        query.andWhere('anime.id IN (SELECT p.id_anime FROM posseder p WHERE p.id_theme = :idTheme)', {idTheme: filters.idTheme});
    }

    return query.getMany();
}

export const getAnimeById = async (id: number): Promise<AnimeEntity | null> => {
    return animeRepository().findOne({
        where: {id},
        relations: {categorie: true, genres: true, themes: true, producteurs: true, sources: {type: true}},
    });
}

const toRefs = (ids?: number[]) => (ids ?? []).map((id) => ({id}));

export const addAnime = async (anime: AnimeToCreateInput): Promise<AnimeEntity> => {
    const created = animeRepository().create({
        nom: anime.nom,
        synopsis: anime.synopsis ?? null,
        image: anime.image ?? null,
        dateAnnonce: anime.dateAnnonce ?? null,
        categorie: anime.idCategorie ? {id: anime.idCategorie} : null,
        genres: toRefs(anime.idGenres),
        themes: toRefs(anime.idThemes),
        producteurs: toRefs(anime.idProducteurs),
        sources: toRefs(anime.idSources),
    });
    const saved = await animeRepository().save(created);
    return getAnimeById(saved.id);
}

export const updateAnime = async (id: number, anime: AnimeToUpdateInput): Promise<AnimeEntity | null> => {
    const changes: DeepPartial<AnimeEntity> = {id};
    if (anime.nom !== undefined) changes.nom = anime.nom;
    if (anime.synopsis !== undefined) changes.synopsis = anime.synopsis;
    if (anime.image !== undefined) changes.image = anime.image;
    if (anime.dateAnnonce !== undefined) changes.dateAnnonce = anime.dateAnnonce;
    if (anime.idCategorie !== undefined) changes.categorie = anime.idCategorie ? {id: anime.idCategorie} : null;
    if (anime.idGenres !== undefined) changes.genres = toRefs(anime.idGenres);
    if (anime.idThemes !== undefined) changes.themes = toRefs(anime.idThemes);
    if (anime.idProducteurs !== undefined) changes.producteurs = toRefs(anime.idProducteurs);
    if (anime.idSources !== undefined) changes.sources = toRefs(anime.idSources);

    if (Object.keys(changes).length > 1) {
        await animeRepository().save(changes);
    }
    return getAnimeById(id);
}

const JOIN_TABLES = ['est_attribuee', 'posseder', 'organiser', 'est_source'];

export const deleteAnime = async (id: number): Promise<void> => {
    await db.transaction(async (manager) => {
        for (const table of JOIN_TABLES) {
            await manager.createQueryBuilder().delete().from(table).where('id_anime = :id', {id}).execute();
        }
        await manager.getRepository(AnimeEntity).delete({id});
    });
}
