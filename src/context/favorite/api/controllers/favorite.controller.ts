import {Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {DomainResponse} from "../../../../core/http/successDomain";
import {AnimeIdParamDto} from "../../../anime/api/dtos/anime.dto";
import {typeFavoriteRepository} from "../../infra/persistances/repositories/favorite.type.repository";
import {toFavoriteListPresenter, toFavoritePresenter} from "../presenters/favorite.presenter";
import {GetFavoritesUseCase} from "../../app/usecases/get-favorites.usecase";
import {GetFavoriteUseCase} from "../../app/usecases/get-favorite.usecase";
import {AddFavoriteUseCase} from "../../app/usecases/add-favorite.usecase";
import {RemoveFavoriteUseCase} from "../../app/usecases/remove-favorite.usecase";
import {ReorderFavoritesUseCase} from "../../app/usecases/reorder-favorites.usecase";

const getFavoritesUseCase = new GetFavoritesUseCase(typeFavoriteRepository);
const getFavoriteUseCase = new GetFavoriteUseCase(typeFavoriteRepository);
const addFavoriteUseCase = new AddFavoriteUseCase(typeFavoriteRepository);
const removeFavoriteUseCase = new RemoveFavoriteUseCase(typeFavoriteRepository);
const reorderFavoritesUseCase = new ReorderFavoritesUseCase(typeFavoriteRepository);

const getAnimeId = (req: Request) => plainToInstance(AnimeIdParamDto, req.params).id;

export const getFavorites = async (req: Request, res: Response) => {
    res.status(200).send(toFavoriteListPresenter(await getFavoritesUseCase.execute(req.user.sub)));
}

export const reorderFavorites = async (req: Request, res: Response) => {
    res.status(200).send(toFavoriteListPresenter(await reorderFavoritesUseCase.execute(req.user.sub, req.body.idAnimes)));
}

export const getFavorite = async (req: Request, res: Response) => {
    const favorite = await getFavoriteUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(200).send(new DomainResponse(toFavoritePresenter(favorite)));
}

export const addFavorite = async (req: Request, res: Response) => {
    const favorite = await addFavoriteUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(201).send(new DomainResponse(toFavoritePresenter(favorite)));
}

export const removeFavorite = async (req: Request, res: Response) => {
    await removeFavoriteUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(204).send();
}
