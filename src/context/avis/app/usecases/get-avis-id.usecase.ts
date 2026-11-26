import {IAvisRepository} from "../interfaces/avis.repository.interface";
import {AvisEntity} from "../../infra/persistances/entities/avis.entity";
import {getExistingAvis} from "../utils/avis.utils";

export class GetAvisByIdUseCase {
    constructor(private readonly avisRepository: IAvisRepository) {}

    async execute(id: number): Promise<{avis: AvisEntity, fil: AvisEntity[]}> {
        const avis = await getExistingAvis(this.avisRepository, id);
        const fil = await this.avisRepository.getAvisByAnime(avis.idAnime);
        return {avis, fil};
    }
}
