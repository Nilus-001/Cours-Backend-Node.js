import {IAnimeRepository} from "../interfaces/anime.repository.interface";
import {animeToCreateInput} from "../inputs/anime.input";
import {AnimeEntity} from "../../../../entities/anime.entity";
import {AnimeReferenceError} from "../../../../core/http/errors/anime.errors";

export class AddAnimeUseCase {
    constructor(private readonly animeRepository: IAnimeRepository) {}

    async execute(anime: animeToCreateInput): Promise<AnimeEntity>{
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