import {AvisEntity} from "../../infra/persistances/entities/avis.entity";
import {CategorieAppreciationEntity} from "../../infra/persistances/entities/categorie-appreciation.entity";
import {AvisToSaveInput, NoteStatsInput} from "../inputs/avis.input";

export interface IAvisRepository {
    getAvisByAnime(idAnime: number): Promise<AvisEntity[]>;
    getAvisByUser(idUser: number): Promise<AvisEntity[]>;
    getAvisById(id: number): Promise<AvisEntity | null>;
    getAvisRacine(idUser: number, idAnime: number): Promise<AvisEntity | null>;
    saveAvis(avis: AvisToSaveInput): Promise<AvisEntity>;
    deleteAvis(id: number): Promise<void>;
    getNoteStats(idAnime: number): Promise<NoteStatsInput>;
    getCategories(): Promise<CategorieAppreciationEntity[]>;
    categorieExists(idCategorie: number): Promise<boolean>;
    animeExists(idAnime: number): Promise<boolean>;
}
