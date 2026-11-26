import {ISuiviRepository} from "../interfaces/suivi.repository.interface";
import {FavoriNotFoundError} from "../../domain/errors/watchlist.errors";
import {persistSuivi, toSuiviInput} from "../utils/suivi.utils";

export class RemoveFavoriUseCase {
    constructor(private readonly suiviRepository: ISuiviRepository) {}

    async execute(idUser: number, idAnime: number): Promise<void> {
        const existant = await this.suiviRepository.getSuivi(idUser, idAnime);
        if (!existant?.estFavoris) {
            throw new FavoriNotFoundError({idAnime});
        }
        const suivi = toSuiviInput(idUser, idAnime, existant);
        suivi.estFavoris = false;
        suivi.classementFavoris = null;
        await persistSuivi(this.suiviRepository, suivi);
    }
}
