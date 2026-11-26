import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {VuOrAVoirEntity} from "../../infra/persistances/entities/vu-or-a-voir.entity";
import {SuiviNotFoundError} from "../../domain/errors/watchlist.errors";

export class GetSuiviUseCase {
    constructor(private readonly suiviRepository: ISuiviRepository) {}

    async execute(idUser: number, idAnime: number): Promise<VuOrAVoirEntity> {
        const suivi = await this.suiviRepository.getSuivi(idUser, idAnime);
        if (!suivi) {
            throw new SuiviNotFoundError({idAnime});
        }
        return suivi;
    }
}
