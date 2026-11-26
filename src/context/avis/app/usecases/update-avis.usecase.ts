import {IAvisRepository} from "../interfaces/avis.repository.interface";
import {AvisEntity} from "../../infra/persistances/entities/avis.entity";
import {AvisActorInput, AvisToUpdateInput} from "../inputs/avis.input";
import {AvisEmptyError, AvisReplyFieldsError} from "../../domain/errors/avis.errors";
import {assertAuteur, assertCategorieExists, getExistingAvis, toAvisInput} from "../utils/avis.utils";

export class UpdateAvisUseCase {
    constructor(private readonly avisRepository: IAvisRepository) {}

    async execute(actor: AvisActorInput, id: number, input: AvisToUpdateInput): Promise<AvisEntity> {
        if (input.note === undefined && input.commentaire === undefined && input.idCategorie === undefined) {
            throw new AvisEmptyError();
        }
        const existant = await getExistingAvis(this.avisRepository, id);
        assertAuteur(existant, actor);

        const avis = toAvisInput(existant);
        if (existant.idAvisParent !== null) {
            if (input.note !== undefined || input.idCategorie !== undefined || !input.commentaire?.trim()) {
                throw new AvisReplyFieldsError({id});
            }
            avis.commentaire = input.commentaire.trim();
            return this.avisRepository.saveAvis(avis);
        }

        if (input.note !== undefined) {
            avis.noteUser = input.note;
        }
        if (input.commentaire !== undefined) {
            avis.commentaire = input.commentaire?.trim() || null;
        }
        if (input.idCategorie !== undefined) {
            await assertCategorieExists(this.avisRepository, input.idCategorie);
            avis.idCategorie = input.idCategorie;
        }
        return this.avisRepository.saveAvis(avis);
    }
}
