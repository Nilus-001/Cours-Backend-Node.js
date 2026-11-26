import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {VuOrAVoirEntity} from "../../infra/persistances/entities/vu-or-a-voir.entity";
import {SuiviOrderError} from "../../domain/errors/watchlist.errors";
import {sameIds} from "../utils/suivi.utils";

export class ReorderFavorisUseCase {
    constructor(private readonly suiviRepository: ISuiviRepository) {}

    async execute(idUser: number, idAnimes: number[]): Promise<VuOrAVoirEntity[]> {
        const actuels = (await this.suiviRepository.getSuivis(idUser, {favori: true})).map((s) => s.idAnime);
        if (!sameIds(actuels, idAnimes)) {
            throw new SuiviOrderError({attendus: actuels});
        }
        await this.suiviRepository.updateClassementsFavoris(idUser, idAnimes);
        return this.suiviRepository.getSuivis(idUser, {favori: true});
    }
}
