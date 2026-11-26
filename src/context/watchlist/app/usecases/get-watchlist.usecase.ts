import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {SuiviFilterInput} from "../inputs/suivi.input";
import {VuOrAVoirEntity} from "../../infra/persistances/entities/vu-or-a-voir.entity";

export class GetWatchlistUseCase {
    constructor(private readonly suiviRepository: ISuiviRepository) {}

    async execute(idUser: number, filters: SuiviFilterInput): Promise<VuOrAVoirEntity[]> {
        return this.suiviRepository.getSuivis(idUser, filters);
    }
}
