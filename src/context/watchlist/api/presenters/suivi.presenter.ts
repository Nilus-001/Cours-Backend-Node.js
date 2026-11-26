import {VuOrAVoirEntity} from "../../infra/persistances/entities/vu-or-a-voir.entity";
import {DomainResponse} from "../../../../core/http/successDomain";
import {SuiviFilterInput} from "../../app/inputs/suivi.input";
import {getSuiviStatut, SuiviStatut} from "../../domain/suivi.statut";

export class SuiviAnimePresenter {
    id!: number;
    nom!: string;
    image!: string | null;
}

export class SuiviPresenter {
    anime!: SuiviAnimePresenter;
    statut!: SuiviStatut | null;
    episodeActuel!: number | null;
    dateVisionnage!: string | null;
    ordre!: number | null;
    favori!: boolean;
    classementFavori!: number | null;
}

export class SuiviFilterPresenter {
    statut!: SuiviStatut | null;
    favori!: boolean | null;
}

export class SuiviListMeta {
    filtres!: SuiviFilterPresenter;
    total!: number;
}

const toDateString = (date: Date | string | null | undefined): string | null => {
    if (!date) return null;
    return date instanceof Date ? date.toISOString().split('T')[0] : date;
}

export const toSuiviPresenter = (suivi: VuOrAVoirEntity): SuiviPresenter => ({
    anime: {id: suivi.anime.id, nom: suivi.anime.nom, image: suivi.anime.image ?? null},
    statut: getSuiviStatut(suivi),
    episodeActuel: suivi.currentWatch ?? null,
    dateVisionnage: toDateString(suivi.dateVisionnage),
    ordre: suivi.ordre ?? null,
    favori: Boolean(suivi.estFavoris),
    classementFavori: suivi.classementFavoris ?? null,
});

export const toSuiviListPresenter = (filters: SuiviFilterInput, suivis: VuOrAVoirEntity[]): DomainResponse<SuiviPresenter[], SuiviListMeta> =>
    new DomainResponse(suivis.map(toSuiviPresenter), {
        filtres: {statut: filters.statut ?? null, favori: filters.favori ?? null},
        total: suivis.length,
    });
