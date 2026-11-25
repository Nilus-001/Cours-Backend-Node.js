import {IAnimeRepository} from "../interfaces/anime.repository.interface";
import {AnimeEntity} from "../../../../entities/anime.entity";
import {animeFilterInput} from "../inputs/animeFilter.input";

export class GetAnimesUseCase {
    constructor(private readonly animeRepository: IAnimeRepository) {}

    async execute(filter: animeFilterInput): Promise<AnimeEntity[]> {
        return this.animeRepository.getAnimes(filter);
    }
}