import {Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {DomainResponse} from "../../../../core/http/successDomain";
import {AnimeIdParamDto} from "../../../anime/api/dtos/anime.dto";
import {SuiviFilterDto} from "../dtos/suivi.dto";
import {SuiviFilterInput} from "../../app/inputs/suivi.input";
import {typeSuiviRepository} from "../../infra/persistances/repositories/suivi.type.repository";
import {toSuiviListPresenter, toSuiviPresenter} from "../presenters/suivi.presenter";
import {GetWatchlistUseCase} from "../../app/usecases/get-watchlist.usecase";
import {GetSuiviUseCase} from "../../app/usecases/get-suivi.usecase";
import {DeleteSuiviUseCase} from "../../app/usecases/delete-suivi.usecase";
import {AddWatchlistUseCase} from "../../app/usecases/add-watchlist.usecase";
import {RemoveWatchlistUseCase} from "../../app/usecases/remove-watchlist.usecase";
import {UpdateProgressUseCase} from "../../app/usecases/update-progress.usecase";
import {AddFavoriUseCase} from "../../app/usecases/add-favori.usecase";
import {RemoveFavoriUseCase} from "../../app/usecases/remove-favori.usecase";
import {ReorderWatchlistUseCase} from "../../app/usecases/reorder-watchlist.usecase";
import {ReorderFavorisUseCase} from "../../app/usecases/reorder-favoris.usecase";
import {SuiviStatut} from "../../domain/suivi.statut";

const getWatchlistUseCase = new GetWatchlistUseCase(typeSuiviRepository);
const getSuiviUseCase = new GetSuiviUseCase(typeSuiviRepository);
const deleteSuiviUseCase = new DeleteSuiviUseCase(typeSuiviRepository);
const addWatchlistUseCase = new AddWatchlistUseCase(typeSuiviRepository);
const removeWatchlistUseCase = new RemoveWatchlistUseCase(typeSuiviRepository);
const updateProgressUseCase = new UpdateProgressUseCase(typeSuiviRepository);
const addFavoriUseCase = new AddFavoriUseCase(typeSuiviRepository);
const removeFavoriUseCase = new RemoveFavoriUseCase(typeSuiviRepository);
const reorderWatchlistUseCase = new ReorderWatchlistUseCase(typeSuiviRepository);
const reorderFavorisUseCase = new ReorderFavorisUseCase(typeSuiviRepository);

const getAnimeId = (req: Request) => plainToInstance(AnimeIdParamDto, req.params).id;

export const getWatchlist = async (req: Request, res: Response) => {
    const {statut, favori} = plainToInstance(SuiviFilterDto, req.query);
    const filters: SuiviFilterInput = {statut, favori};
    const suivis = await getWatchlistUseCase.execute(req.user.sub, filters);
    res.status(200).send(toSuiviListPresenter(filters, suivis));
}

export const getFavoris = async (req: Request, res: Response) => {
    const filters: SuiviFilterInput = {favori: true};
    const suivis = await getWatchlistUseCase.execute(req.user.sub, filters);
    res.status(200).send(toSuiviListPresenter(filters, suivis));
}

export const reorderWatchlist = async (req: Request, res: Response) => {
    const suivis = await reorderWatchlistUseCase.execute(req.user.sub, req.body.idAnimes);
    res.status(200).send(toSuiviListPresenter({statut: SuiviStatut.A_VOIR}, suivis));
}

export const reorderFavoris = async (req: Request, res: Response) => {
    const suivis = await reorderFavorisUseCase.execute(req.user.sub, req.body.idAnimes);
    res.status(200).send(toSuiviListPresenter({favori: true}, suivis));
}

export const getSuivi = async (req: Request, res: Response) => {
    const suivi = await getSuiviUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(200).send(new DomainResponse(toSuiviPresenter(suivi)));
}

export const deleteSuivi = async (req: Request, res: Response) => {
    await deleteSuiviUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(204).send();
}

export const addWatchlist = async (req: Request, res: Response) => {
    const suivi = await addWatchlistUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(201).send(new DomainResponse(toSuiviPresenter(suivi)));
}

export const removeWatchlist = async (req: Request, res: Response) => {
    await removeWatchlistUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(204).send();
}

export const updateProgress = async (req: Request, res: Response) => {
    const suivi = await updateProgressUseCase.execute(req.user.sub, getAnimeId(req), req.body);
    if (!suivi) {
        res.status(204).send();
        return;
    }
    res.status(200).send(new DomainResponse(toSuiviPresenter(suivi)));
}

export const addFavori = async (req: Request, res: Response) => {
    const suivi = await addFavoriUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(201).send(new DomainResponse(toSuiviPresenter(suivi)));
}

export const removeFavori = async (req: Request, res: Response) => {
    await removeFavoriUseCase.execute(req.user.sub, getAnimeId(req));
    res.status(204).send();
}
