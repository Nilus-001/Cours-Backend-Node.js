import {AvisEntity} from "../../infra/persistances/entities/avis.entity";
import {CategorieAppreciationEntity} from "../../infra/persistances/entities/categorie-appreciation.entity";
import {DomainResponse} from "../../../../core/http/successDomain";
import {LibellePresenter, NomPresenter} from "../../../anime/api/presenters/anime.presenter";
import {NoteStatsInput} from "../../app/inputs/avis.input";

export class AvisAuteurPresenter {
    id!: number;
    identifiant!: string;
}

export class AvisPresenter {
    id!: number;
    anime!: NomPresenter;
    idAvisParent!: number | null;
    auteur!: AvisAuteurPresenter;
    note!: number | null;
    commentaire!: string | null;
    categorie!: LibellePresenter | null;
    date!: string | null;
    reponses?: AvisPresenter[];
}

export class AnimeAvisListMeta {
    noteMoyenne!: number | null;
    nombreNotes!: number;
    total!: number;
    totalMessages!: number;
}

export class AvisListMeta {
    total!: number;
}

const toDateString = (date: Date | string | null | undefined): string | null => {
    if (!date) return null;
    return date instanceof Date ? date.toISOString().split('T')[0] : date;
}

export const toCategorieAppreciationPresenter = (categ: CategorieAppreciationEntity): LibellePresenter => ({
    id: categ.id,
    libelle: categ.categorie,
});

export const toAvisPresenter = (avis: AvisEntity): AvisPresenter => ({
    id: avis.id,
    anime: {id: avis.anime.id, nom: avis.anime.nom},
    idAvisParent: avis.idAvisParent ?? null,
    auteur: {id: avis.user.id, identifiant: avis.user.identifiant},
    note: avis.noteUser ?? null,
    commentaire: avis.commentaire ?? null,
    categorie: avis.categorieAppreciation ? toCategorieAppreciationPresenter(avis.categorieAppreciation) : null,
    date: toDateString(avis.dateAvis),
});

const groupByParent = (avis: AvisEntity[]): Map<number | null, AvisEntity[]> =>
    avis.reduce((acc, a) => {
        const key = a.idAvisParent ?? null;
        acc.set(key, [...(acc.get(key) ?? []), a]);
        return acc;
    }, new Map<number | null, AvisEntity[]>());

const toFilPresenter = (avis: AvisEntity, enfants: Map<number | null, AvisEntity[]>): AvisPresenter => ({
    ...toAvisPresenter(avis),
    reponses: (enfants.get(avis.id) ?? []).map((reponse) => toFilPresenter(reponse, enfants)),
});

export const toAvisFilPresenter = (avis: AvisEntity, fil: AvisEntity[]): AvisPresenter =>
    toFilPresenter(avis, groupByParent(fil));

export const toAnimeAvisListPresenter = (avis: AvisEntity[], stats: NoteStatsInput): DomainResponse<AvisPresenter[], AnimeAvisListMeta> => {
    const enfants = groupByParent(avis);
    const racines = [...(enfants.get(null) ?? [])].reverse();
    return new DomainResponse(racines.map((racine) => toFilPresenter(racine, enfants)), {
        noteMoyenne: stats.moyenne,
        nombreNotes: stats.nombre,
        total: racines.length,
        totalMessages: avis.length,
    });
}

export const toAvisListPresenter = (avis: AvisEntity[]): DomainResponse<AvisPresenter[], AvisListMeta> =>
    new DomainResponse(avis.map(toAvisPresenter), {total: avis.length});
