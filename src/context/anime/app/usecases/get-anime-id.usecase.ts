import {IAnimeRepository} from "../interfaces/anime.repository.interface";
import {AnimeEntity} from "../../infra/persistances/entities/anime.entity";
import {AnimeNotFoundError} from "../../../../core/http/errors/anime.errors";

export class GetAnimeByIdUseCase {
    constructor(private readonly animeRepository: IAnimeRepository) {}

    async execute(id: number): Promise<AnimeEntity | null> {
        const anime = await this.animeRepository.getAnimeById(id);
        if (!anime) {
            throw new AnimeNotFoundError({id});
        }
        return anime;
    }
}