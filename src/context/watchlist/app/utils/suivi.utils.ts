import {VuOrAVoirEntity} from "../../infra/persistances/entities/vu-or-a-voir.entity";
import {SuiviToSaveInput} from "../inputs/suivi.input";
import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {isSuiviVide} from "../../domain/suivi.statut";
import {AnimeNotFoundError} from "../../../anime/domain/errors/anime.errors";

export const toSuiviInput = (idUser: number, idAnime: number, suivi: VuOrAVoirEntity | null): SuiviToSaveInput => ({
    idAnime,
    idUser,
    dateVisionnage: suivi?.dateVisionnage ?? null,
    isWatchlist: suivi?.isWatchlist ?? false,
    currentWatch: suivi?.currentWatch ?? null,
    ordre: suivi?.ordre ?? null,
    estFavoris: suivi?.estFavoris ?? false,
    classementFavoris: suivi?.classementFavoris ?? null,
});

export const persistSuivi = async (repository: ISuiviRepository, suivi: SuiviToSaveInput): Promise<VuOrAVoirEntity | null> => {
    if (isSuiviVide(suivi)) {
        await repository.deleteSuivi(suivi.idUser, suivi.idAnime);
        return null;
    }
    return repository.saveSuivi(suivi);
}

export const assertAnimeExists = async (repository: ISuiviRepository, idAnime: number): Promise<void> => {
    if (!await repository.animeExists(idAnime)) {
        throw new AnimeNotFoundError({id: idAnime});
    }
}

export const sameIds = (a: number[], b: number[]): boolean =>
    a.length === b.length && a.every((id) => b.includes(id));
