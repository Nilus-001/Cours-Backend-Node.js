import {IAvisRepository} from "../interfaces/avis.repository.interface";
import {AvisEntity} from "../../infra/persistances/entities/avis.entity";
import {ReponseToCreateInput} from "../inputs/avis.input";
import {getExistingAvis} from "../utils/avis.utils";

export class ReplyAvisUseCase {
    constructor(private readonly avisRepository: IAvisRepository) {}

    async execute(idUser: number, idParent: number, input: ReponseToCreateInput): Promise<AvisEntity> {
        const parent = await getExistingAvis(this.avisRepository, idParent);

        return this.avisRepository.saveAvis({
            idAnime: parent.idAnime,
            idUser,
            idAvisParent: parent.id,
            noteUser: null,
            commentaire: input.commentaire.trim(),
            idCategorie: null,
            dateAvis: new Date(),
        });
    }
}
