import {Request, Response} from "express";
import {DomainResponse} from "../../../../core/http/successDomain";
import {plainToInstance} from "class-transformer";
import {AnimeIdParamDto} from "../dtos/anime.dto";
import {AnimeFilterDto} from "../dtos/animeFilter.dto";
import {AnimeFilterInput} from "../../app/inputs/animeFilter.input";
import {GetAnimesUseCase} from "../../app/usecases/get-anime.usecase";
import {typeAnimeRepository} from "../../infra/persistances/repositories/anime.type.repository";
import {toAnimeListPresenter} from "../presenters/animeList.presenter";
import {toAnimePresenter} from "../presenters/anime.presenter";
import {GetAnimeByIdUseCase} from "../../app/usecases/get-anime-id.usecase";
import {AddAnimeUseCase} from "../../app/usecases/add-anime.usecase";
import {UpdateAnimeUseCase} from "../../app/usecases/update-anime.usecase";
import {DeleteAnimeUseCase} from "../../app/usecases/delete-anime.usecase";

const getAnimesUseCase = new GetAnimesUseCase(typeAnimeRepository);
const getAnimeByIdUseCase = new GetAnimeByIdUseCase(typeAnimeRepository);
const addAnimeUseCase = new AddAnimeUseCase(typeAnimeRepository);
const updateAnimeUseCase = new UpdateAnimeUseCase(typeAnimeRepository);
const deleteAnimeUseCase = new DeleteAnimeUseCase(typeAnimeRepository);

export const getAnimes = async (req: Request, res: Response) => {
    const {nom, dateAnnonce, idCategorie, idGenre, idTheme} = plainToInstance(AnimeFilterDto, req.query);
    const filters: AnimeFilterInput = {nom: nom?.trim(), dateAnnonce, idCategorie, idGenre, idTheme};

    const animes = await getAnimesUseCase.execute(filters);

    res.status(200).send(toAnimeListPresenter(filters, animes));
}

export const addAnime = async (req: Request, res: Response) => {
    const anime = await addAnimeUseCase.execute(req.body);
    res.status(201).send(new DomainResponse(toAnimePresenter(anime)));
}

export const updateAnime = async (req: Request, res: Response) => {
    const {id} = plainToInstance(AnimeIdParamDto, req.params);
    const anime = await updateAnimeUseCase.execute(id, req.body);
    res.status(200).send(new DomainResponse(toAnimePresenter(anime)));
}

export const deleteAnime = async (req: Request, res: Response) => {
    const {id} = plainToInstance(AnimeIdParamDto, req.params);
    await deleteAnimeUseCase.execute(id);
    res.status(204).send();
}

export const getAnimeById = async (req: Request, res: Response) => {
    const {id} = plainToInstance(AnimeIdParamDto, req.params);

    const anime = await getAnimeByIdUseCase.execute(id);

    res.status(200).send(new DomainResponse(toAnimePresenter(anime)));
}
