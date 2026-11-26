import {IAvisRepository} from "../interfaces/avis.repository.interface";
import {AvisEntity} from "../../infra/persistances/entities/avis.entity";
import {AvisActorInput, AvisToSaveInput} from "../inputs/avis.input";
import {AvisForbiddenError, AvisNotFoundError, CategorieAppreciationNotFoundError} from "../../domain/errors/avis.errors";
import {AnimeNotFoundError} from "../../../anime/domain/errors/anime.errors";
import {Perm} from "../../../../core/http/perms/perm.list";
import {hasPerm} from "../../../../core/http/perms/utils/permission.util";

export const assertAnimeExists = async (repository: IAvisRepository, idAnime: number): Promise<void> => {
    if (!await repository.animeExists(idAnime)) {
        throw new AnimeNotFoundError({id: idAnime});
    }
}

export const assertCategorieExists = async (repository: IAvisRepository, idCategorie: number | null | undefined): Promise<void> => {
    if (idCategorie && !await repository.categorieExists(idCategorie)) {
        throw new CategorieAppreciationNotFoundError({idCategorie});
    }
}

export const getExistingAvis = async (repository: IAvisRepository, id: number): Promise<AvisEntity> => {
    const avis = await repository.getAvisById(id);
    if (!avis) {
        throw new AvisNotFoundError({id});
    }
    return avis;
}

export const isAuteur = (avis: AvisEntity, actor: AvisActorInput): boolean => avis.idUser === actor.idUser;

export const isModerateur = (actor: AvisActorInput): boolean => {
    const perms = BigInt(actor.perm ?? 0n);
    return hasPerm(perms, Perm.ADMINISTRATOR) || hasPerm(perms, Perm.MODERATE_REVIEWS);
}

export const assertAuteur = (avis: AvisEntity, actor: AvisActorInput): void => {
    if (!isAuteur(avis, actor)) {
        throw new AvisForbiddenError({id: avis.id});
    }
}

export const assertAuteurOuModerateur = (avis: AvisEntity, actor: AvisActorInput): void => {
    if (!isAuteur(avis, actor) && !isModerateur(actor)) {
        throw new AvisForbiddenError({id: avis.id});
    }
}

export const toAvisInput = (avis: AvisEntity): AvisToSaveInput => ({
    id: avis.id,
    idAnime: avis.idAnime,
    idUser: avis.idUser,
    idAvisParent: avis.idAvisParent,
    noteUser: avis.noteUser,
    commentaire: avis.commentaire,
    idCategorie: avis.idCategorie,
    dateAvis: avis.dateAvis,
});
