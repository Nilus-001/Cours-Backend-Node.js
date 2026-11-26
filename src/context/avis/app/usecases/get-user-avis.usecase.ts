import {IAvisRepository} from "../interfaces/avis.repository.interface";
import {AvisEntity} from "../../infra/persistances/entities/avis.entity";

export class GetUserAvisUseCase {
    constructor(private readonly avisRepository: IAvisRepository) {}

    async execute(idUser: number): Promise<AvisEntity[]> {
        return this.avisRepository.getAvisByUser(idUser);
    }
}
