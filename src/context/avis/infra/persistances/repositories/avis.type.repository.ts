import * as avisRepository from "./avis.repository";
import {IAvisRepository} from "../../../app/interfaces/avis.repository.interface";

export const typeAvisRepository: IAvisRepository = {
    getAvisByAnime: avisRepository.getAvisByAnime,
    getAvisByUser: avisRepository.getAvisByUser,
    getAvisById: avisRepository.getAvisById,
    getAvisRacine: avisRepository.getAvisRacine,
    saveAvis: avisRepository.saveAvis,
    deleteAvis: avisRepository.deleteAvis,
    getNoteStats: avisRepository.getNoteStats,
    getCategories: avisRepository.getCategories,
    categorieExists: avisRepository.categorieExists,
    animeExists: avisRepository.animeExists,
};
