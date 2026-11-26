import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {ProgressInput} from "../inputs/suivi.input";
import {VuOrAVoirEntity} from "../../infra/persistances/entities/vu-or-a-voir.entity";
import {EpisodeOutOfRangeError, ProgressEmptyError} from "../../domain/errors/watchlist.errors";
import {getSuiviStatut, SuiviStatut} from "../../domain/suivi.statut";
import {assertAnimeExists, persistSuivi, toSuiviInput} from "../utils/suivi.utils";

export class UpdateProgressUseCase {
    constructor(private readonly suiviRepository: ISuiviRepository) {}

    async execute(idUser: number, idAnime: number, progress: ProgressInput): Promise<VuOrAVoirEntity | null> {
        if (progress.episode === undefined && progress.termine === undefined) {
            throw new ProgressEmptyError();
        }
        await assertAnimeExists(this.suiviRepository, idAnime);

        const totalEpisodes = await this.suiviRepository.countEpisodes(idAnime);
        const episode = progress.episode ?? null;
        if (episode !== null && totalEpisodes > 0 && episode > totalEpisodes) {
            throw new EpisodeOutOfRangeError({episode, totalEpisodes});
        }

        const existant = await this.suiviRepository.getSuivi(idUser, idAnime);
        const suivi = toSuiviInput(idUser, idAnime, existant);

        if (progress.episode !== undefined) {
            suivi.currentWatch = episode;
        }

        const termine = progress.termine ?? (episode !== null && totalEpisodes > 0 && episode === totalEpisodes ? true : undefined);
        if (termine === true) {
            suivi.dateVisionnage = suivi.dateVisionnage ?? new Date();
            if (suivi.currentWatch === null && totalEpisodes > 0) {
                suivi.currentWatch = totalEpisodes;
            }
        }
        if (termine === false) {
            suivi.dateVisionnage = null;
        }

        const statut = getSuiviStatut(suivi);
        if (statut === SuiviStatut.EN_COURS || statut === SuiviStatut.VU) {
            suivi.isWatchlist = false;
            suivi.ordre = null;
        }

        return persistSuivi(this.suiviRepository, suivi);
    }
}
