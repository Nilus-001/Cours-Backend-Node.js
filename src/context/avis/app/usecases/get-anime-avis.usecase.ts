import {IAvisRepository} from "../interfaces/avis.repository.interface";
import {AvisEntity} from "../../infra/persistances/entities/avis.entity";
import {NoteStatsInput} from "../inputs/avis.input";
import {assertAnimeExists} from "../utils/avis.utils";

export class GetAnimeAvisUseCase {
    constructor(private readonly avisRepository: IAvisRepository) {}

    async execute(idAnime: number): Promise<{avis: AvisEntity[], stats: NoteStatsInput}> {
        await assertAnimeExists(this.avisRepository, idAnime);
        const [avis, stats] = await Promise.all([
            this.avisRepository.getAvisByAnime(idAnime),
            this.avisRepository.getNoteStats(idAnime),
        ]);
        return {avis, stats};
    }
}
