import {IAnimeRepository} from "../interfaces/anime.repository.interface";
import {AnimeToUpdateInput} from "../inputs/anime.input";
import {AnimeEntity} from "../../infra/persistances/entities/anime.entity";
import {AnimeNotFoundError, AnimeReferenceError} from "../../domain/errors/anime.errors";

export class UpdateAnimeUseCase {
    constructor(private readonly animeRepository: IAnimeRepository) {}

    async execute(id: number, anime: AnimeToUpdateInput): Promise<AnimeEntity | null> {
        const existant = await this.animeRepository.getAnimeById(id);
        if (!existant) {
            throw new AnimeNotFoundError({id});
        }
        try {
            return await this.animeRepository.updateAnime(id, anime);
        } catch (e) {
            if (e?.driverError?.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new AnimeReferenceError();
            }
            throw e;
        }
    }
}
