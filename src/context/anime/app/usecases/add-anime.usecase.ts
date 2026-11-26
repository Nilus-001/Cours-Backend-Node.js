import {IAnimeRepository} from "../interfaces/anime.repository.interface";
import {AnimeToCreateInput} from "../inputs/anime.input";
import {AnimeEntity} from "../../infra/persistances/entities/anime.entity";
import {AnimeReferenceError} from "../../domain/errors/anime.errors";

export class AddAnimeUseCase {
    constructor(private readonly animeRepository: IAnimeRepository) {}

    async execute(anime: AnimeToCreateInput): Promise<AnimeEntity>{
        try {
            return await this.animeRepository.addAnime(anime);
        } catch (e) {
            if (e?.driverError?.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new AnimeReferenceError();
            }
            throw e;
        }
    }
}
