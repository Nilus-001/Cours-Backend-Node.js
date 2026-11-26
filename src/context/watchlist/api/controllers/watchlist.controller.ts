import {Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {DomainResponse} from "../../../../core/http/successDomain";
import {AnimeIdParamDto} from "../../../anime/api/dtos/anime.dto";
import {WatchlistFilterDto} from "../dtos/watchlist.dto";
import {WatchlistFilterInput} from "../../app/inputs/watchlist.input";
import {typeWatchlistRepository} from "../../infra/persistances/repositories/watchlist.type.repository";
import {toWatchlistListPresenter, toWatchlistPresenter} from "../presenters/watchlist.presenter";
import {GetWatchlistUseCase} from "../../app/usecases/get-watchlist.usecase";
import {GetTrackingUseCase} from "../../app/usecases/get-tracking.usecase";
import {DeleteTrackingUseCase} from "../../app/usecases/delete-tracking.usecase";
import {AddWatchlistUseCase} from "../../app/usecases/add-watchlist.usecase";
import {RemoveWatchlistUseCase} from "../../app/usecases/remove-watchlist.usecase";
import {UpdateProgressUseCase} from "../../app/usecases/update-progress.usecase";
import {ReorderWatchlistUseCase} from "../../app/usecases/reorder-watchlist.usecase";
import {WatchlistStatut} from "../../domain/watchlist.statut";

const getWatchlistUseCase = new GetWatchlistUseCase(typeWatchlistRepository);
const getTrackingUseCase = new GetTrackingUseCase(typeWatchlistRepository);
const deleteTrackingUseCase = new DeleteTrackingUseCase(typeWatchlistRepository);
const addWatchlistUseCase = new AddWatchlistUseCase(typeWatchlistRepository);
const removeWatchlistUseCase = new RemoveWatchlistUseCase(typeWatchlistRepository);
const updateProgressUseCase = new UpdateProgressUseCase(typeWatchlistRepository);
const reorderWatchlistUseCase = new ReorderWatchlistUseCase(typeWatchlistRepository);

const getAnimeId = (req: Request) => plainToInstance(AnimeIdParamDto, req.params).id;

export const getWatchlist = async (req: Request, res: Response) => {
    const {statut} = plainToInstance(WatchlistFilterDto, req.query);
    const filters: WatchlistFilterInput = {statut};
    const entries = await getWatchlistUseCase.execute(req.user.sub, filters);
    res.status(200).send(toWatchlistListPresenter(filters, entries));
}

export const reorderWatchlist = async (req: Request, res: Response) => {
    const entries = await reorderWatchlistUseCase.execute(req.user.sub, req.body.idAnimes);
    res.status(200).send(toWatchlistListPresenter({statut: WatchlistStatut.A_VOIR}, entries));
}

export const getTracking = async (req: Request, res: Response) => {
    const entry = await getTrackingUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(200).send(new DomainResponse(toWatchlistPresenter(entry)));
}

export const deleteTracking = async (req: Request, res: Response) => {
    await deleteTrackingUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(204).send();
}

export const addWatchlist = async (req: Request, res: Response) => {
    const entry = await addWatchlistUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(201).send(new DomainResponse(toWatchlistPresenter(entry)));
}

export const removeWatchlist = async (req: Request, res: Response) => {
    await removeWatchlistUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(204).send();
}

export const updateProgress = async (req: Request, res: Response) => {
    const entry = await updateProgressUseCase.execute(req.user.sub, getAnimeId(req), req.body);
    if (!entry) {
        res.status(204).send();
        return;
    }
    res.status(200).send(new DomainResponse(toWatchlistPresenter(entry)));
}
