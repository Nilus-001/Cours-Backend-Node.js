import AnimeFilter from "../types/animeFilter.type";
import {db} from "../core/configs/database/typeorm.config";
import {AnimeEntity} from "../entities/anime.entity";
import {animeToCreateInput} from "../types/inputs/anime.input";

const animeRepository = () => db.getRepository(AnimeEntity);

export const getAnimes = async (filters: AnimeFilter): Promise<AnimeEntity[]> => {
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

export const addAnime = async (anime: animeToCreateInput): Promise<AnimeEntity> => {
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
