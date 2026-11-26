import {Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {DomainResponse} from "../../../../core/http/successDomain";
import {AnimeIdParamDto} from "../../../anime/api/dtos/anime.dto";
import {AvisActorInput} from "../../app/inputs/avis.input";
import {typeAvisRepository} from "../../infra/persistances/repositories/avis.type.repository";
import {toAnimeAvisListPresenter, toAvisFilPresenter, toAvisListPresenter, toAvisPresenter, toCategorieAppreciationPresenter} from "../presenters/avis.presenter";
import {GetAnimeAvisUseCase} from "../../app/usecases/get-anime-avis.usecase";
import {GetAvisByIdUseCase} from "../../app/usecases/get-avis-id.usecase";
import {GetUserAvisUseCase} from "../../app/usecases/get-user-avis.usecase";
import {GetCategoriesAppreciationUseCase} from "../../app/usecases/get-categories-appreciation.usecase";
import {AddAvisUseCase} from "../../app/usecases/add-avis.usecase";
import {ReplyAvisUseCase} from "../../app/usecases/reply-avis.usecase";
import {UpdateAvisUseCase} from "../../app/usecases/update-avis.usecase";
import {DeleteAvisUseCase} from "../../app/usecases/delete-avis.usecase";

const getAnimeAvisUseCase = new GetAnimeAvisUseCase(typeAvisRepository);
const getAvisByIdUseCase = new GetAvisByIdUseCase(typeAvisRepository);
const getUserAvisUseCase = new GetUserAvisUseCase(typeAvisRepository);
const getCategoriesAppreciationUseCase = new GetCategoriesAppreciationUseCase(typeAvisRepository);
const addAvisUseCase = new AddAvisUseCase(typeAvisRepository);
const replyAvisUseCase = new ReplyAvisUseCase(typeAvisRepository);
const updateAvisUseCase = new UpdateAvisUseCase(typeAvisRepository);
const deleteAvisUseCase = new DeleteAvisUseCase(typeAvisRepository);

const getId = (req: Request) => plainToInstance(AnimeIdParamDto, req.params).id;
const getActor = (req: Request): AvisActorInput => ({idUser: req.user.sub, perm: req.user.perm});

export const getAnimeAvis = async (req: Request, res: Response) => {
    const {avis, stats} = await getAnimeAvisUseCase.execute(getId(req));
    res.status(200).send(toAnimeAvisListPresenter(avis, stats));
}

export const addAvis = async (req: Request, res: Response) => {
    const avis = await addAvisUseCase.execute(req.user.sub, getId(req), req.body);
    res.status(201).send(new DomainResponse(toAvisPresenter(avis)));
}

export const getCategories = async (req: Request, res: Response) => {
    const categories = await getCategoriesAppreciationUseCase.execute();
    res.status(200).send(new DomainResponse(categories.map(toCategorieAppreciationPresenter)));
}

export const getAvisById = async (req: Request, res: Response) => {
    const {avis, fil} = await getAvisByIdUseCase.execute(getId(req));
    res.status(200).send(new DomainResponse(toAvisFilPresenter(avis, fil)));
}

export const replyAvis = async (req: Request, res: Response) => {
    const avis = await replyAvisUseCase.execute(req.user.sub, getId(req), req.body);
    res.status(201).send(new DomainResponse(toAvisPresenter(avis)));
}

export const updateAvis = async (req: Request, res: Response) => {
    const avis = await updateAvisUseCase.execute(getActor(req), getId(req), req.body);
    res.status(200).send(new DomainResponse(toAvisPresenter(avis)));
}

export const deleteAvis = async (req: Request, res: Response) => {
    await deleteAvisUseCase.execute(getActor(req), getId(req));
    res.status(204).send();
}

export const getMesAvis = async (req: Request, res: Response) => {
    const avis = await getUserAvisUseCase.execute(req.user.sub);
    res.status(200).send(toAvisListPresenter(avis));
}
