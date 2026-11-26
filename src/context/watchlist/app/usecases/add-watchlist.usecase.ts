import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {VuOrAVoirEntity} from "../../infra/persistances/entities/vu-or-a-voir.entity";
import {WatchlistAlreadyError, WatchlistStartedError} from "../../domain/errors/watchlist.errors";
import {getSuiviStatut, SuiviStatut} from "../../domain/suivi.statut";
import {assertAnimeExists, toSuiviInput} from "../utils/suivi.utils";

export class AddWatchlistUseCase {
    constructor(private readonly suiviRepository: ISuiviRepository) {}

    async execute(idUser: number, idAnime: number): Promise<VuOrAVoirEntity> {
        await assertAnimeExists(this.suiviRepository, idAnime);
        const existant = await this.suiviRepository.getSuivi(idUser, idAnime);
        const statut = existant ? getSuiviStatut(existant) : null;

        if (statut === SuiviStatut.A_VOIR) {
            throw new WatchlistAlreadyError({idAnime});
        }
        if (statut === SuiviStatut.EN_COURS || statut === SuiviStatut.VU) {
            throw new WatchlistStartedError({idAnime, statut});
        }

        const suivi = toSuiviInput(idUser, idAnime, existant);
        suivi.isWatchlist = true;
        suivi.ordre = await this.suiviRepository.getMaxOrdre(idUser) + 1;
        return this.suiviRepository.saveSuivi(suivi);
    }
}
