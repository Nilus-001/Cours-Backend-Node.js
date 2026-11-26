import {IAvisRepository} from "../interfaces/avis.repository.interface";
import {AvisActorInput} from "../inputs/avis.input";
import {assertAuteurOuModerateur, getExistingAvis} from "../utils/avis.utils";

export class DeleteAvisUseCase {
    constructor(private readonly avisRepository: IAvisRepository) {}

    async execute(actor: AvisActorInput, id: number): Promise<void> {
        const avis = await getExistingAvis(this.avisRepository, id);
        assertAuteurOuModerateur(avis, actor);
        await this.avisRepository.deleteAvis(id);
    }
}
