import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {VuOrAVoirEntity} from "../../infra/persistances/entities/vu-or-a-voir.entity";
import {SuiviOrderError} from "../../domain/errors/watchlist.errors";
import {SuiviStatut} from "../../domain/suivi.statut";
import {sameIds} from "../utils/suivi.utils";

export class ReorderWatchlistUseCase {
    constructor(private readonly suiviRepository: ISuiviRepository) {}

    async execute(idUser: number, idAnimes: number[]): Promise<VuOrAVoirEntity[]> {
        const actuels = (await this.suiviRepository.getSuivis(idUser, {statut: SuiviStatut.A_VOIR})).map((s) => s.idAnime);
        if (!sameIds(actuels, idAnimes)) {
            throw new SuiviOrderError({attendus: actuels});
        }
        await this.suiviRepository.updateOrdres(idUser, idAnimes);
        return this.suiviRepository.getSuivis(idUser, {statut: SuiviStatut.A_VOIR});
    }
}
