import {IAvisRepository} from "../interfaces/avis.repository.interface";
import {AvisEntity} from "../../infra/persistances/entities/avis.entity";
import {AvisToCreateInput} from "../inputs/avis.input";
import {AvisAlreadyError} from "../../domain/errors/avis.errors";
import {assertAnimeExists, assertCategorieExists} from "../utils/avis.utils";

export class AddAvisUseCase {
    constructor(private readonly avisRepository: IAvisRepository) {}

    async execute(idUser: number, idAnime: number, input: AvisToCreateInput): Promise<AvisEntity> {
        await assertAnimeExists(this.avisRepository, idAnime);
        const existant = await this.avisRepository.getAvisRacine(idUser, idAnime);
        if (existant) {
            throw new AvisAlreadyError({idAnime, idAvis: existant.id});
        }
        await assertCategorieExists(this.avisRepository, input.idCategorie);

        return this.avisRepository.saveAvis({
            idAnime,
            idUser,
            idAvisParent: null,
            noteUser: input.note,
            commentaire: input.commentaire?.trim() || null,
            idCategorie: input.idCategorie ?? null,
            dateAvis: new Date(),
        });
    }
}
