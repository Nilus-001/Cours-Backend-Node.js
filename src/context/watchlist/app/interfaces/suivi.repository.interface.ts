import {VuOrAVoirEntity} from "../../infra/persistances/entities/vu-or-a-voir.entity";
import {SuiviFilterInput, SuiviToSaveInput} from "../inputs/suivi.input";

export interface ISuiviRepository {
    getSuivis(idUser: number, filters: SuiviFilterInput): Promise<VuOrAVoirEntity[]>;
    getSuivi(idUser: number, idAnime: number): Promise<VuOrAVoirEntity | null>;
    saveSuivi(suivi: SuiviToSaveInput): Promise<VuOrAVoirEntity>;
    deleteSuivi(idUser: number, idAnime: number): Promise<void>;
    getMaxOrdre(idUser: number): Promise<number>;
    getMaxClassementFavoris(idUser: number): Promise<number>;
    updateOrdres(idUser: number, idAnimes: number[]): Promise<void>;
    updateClassementsFavoris(idUser: number, idAnimes: number[]): Promise<void>;
    animeExists(idAnime: number): Promise<boolean>;
    countEpisodes(idAnime: number): Promise<number>;
}
