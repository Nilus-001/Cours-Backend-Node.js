import * as suiviRepository from "./suivi.repository";
import {ISuiviRepository} from "../../../app/interfaces/suivi.repository.interface";

export const typeSuiviRepository: ISuiviRepository = {
    getSuivis: suiviRepository.getSuivis,
    getSuivi: suiviRepository.getSuivi,
    saveSuivi: suiviRepository.saveSuivi,
    deleteSuivi: suiviRepository.deleteSuivi,
    getMaxOrdre: suiviRepository.getMaxOrdre,
    getMaxClassementFavoris: suiviRepository.getMaxClassementFavoris,
    updateOrdres: suiviRepository.updateOrdres,
    updateClassementsFavoris: suiviRepository.updateClassementsFavoris,
    animeExists: suiviRepository.animeExists,
    countEpisodes: suiviRepository.countEpisodes,
};
