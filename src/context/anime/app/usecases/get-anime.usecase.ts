import {IAnimeRepository} from "../interfaces/anime.repository.interface";
import {AnimeEntity} from "../../infra/persistances/entities/anime.entity";
import {AnimeFilterInput} from "../inputs/animeFilter.input";

export class GetAnimesUseCase {
    constructor(private readonly animeRepository: IAnimeRepository) {}

    async execute(filter: AnimeFilterInput): Promise<AnimeEntity[]> {
        return this.animeRepository.getAnimes(filter);
    }
}
