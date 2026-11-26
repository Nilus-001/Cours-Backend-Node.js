import {IAnimeRepository} from "../interfaces/anime.repository.interface";
import {AnimeDependenciesError, AnimeNotFoundError} from "../../domain/errors/anime.errors";

export class DeleteAnimeUseCase {
    constructor(private readonly animeRepository: IAnimeRepository) {}

    async execute(id: number): Promise<void> {
        const existant = await this.animeRepository.getAnimeById(id);
        if (!existant) {
            throw new AnimeNotFoundError({id});
        }
        try {
            await this.animeRepository.deleteAnime(id);
        } catch (e) {
            if (e?.driverError?.code === 'ER_ROW_IS_REFERENCED_2') {
                throw new AnimeDependenciesError({id});
            }
            throw e;
        }
    }
}
