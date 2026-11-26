import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {VuOrAVoirEntity} from "../../infra/persistances/entities/vu-or-a-voir.entity";
import {FavoriAlreadyError} from "../../domain/errors/watchlist.errors";
import {assertAnimeExists, toSuiviInput} from "../utils/suivi.utils";

export class AddFavoriUseCase {
    constructor(private readonly suiviRepository: ISuiviRepository) {}

    async execute(idUser: number, idAnime: number): Promise<VuOrAVoirEntity> {
        await assertAnimeExists(this.suiviRepository, idAnime);
        const existant = await this.suiviRepository.getSuivi(idUser, idAnime);
        if (existant?.estFavoris) {
            throw new FavoriAlreadyError({idAnime});
        }
        const suivi = toSuiviInput(idUser, idAnime, existant);
        suivi.estFavoris = true;
        suivi.classementFavoris = await this.suiviRepository.getMaxClassementFavoris(idUser) + 1;
        return this.suiviRepository.saveSuivi(suivi);
    }
}
