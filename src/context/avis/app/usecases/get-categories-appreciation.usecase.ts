import {IAvisRepository} from "../interfaces/avis.repository.interface";
import {CategorieAppreciationEntity} from "../../infra/persistances/entities/categorie-appreciation.entity";

export class GetCategoriesAppreciationUseCase {
    constructor(private readonly avisRepository: IAvisRepository) {}

    async execute(): Promise<CategorieAppreciationEntity[]> {
        return this.avisRepository.getCategories();
    }
}
