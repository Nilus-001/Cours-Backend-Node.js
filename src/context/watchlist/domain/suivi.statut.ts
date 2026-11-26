export const SuiviStatut = Object.freeze({
    A_VOIR: 'a_voir',
    EN_COURS: 'en_cours',
    VU: 'vu',
} as const);

export type SuiviStatut = typeof SuiviStatut[keyof typeof SuiviStatut];

export const SUIVI_STATUTS = Object.values(SuiviStatut);

type SuiviState = {
    dateVisionnage: Date | string | null;
    currentWatch: number | null;
    isWatchlist: boolean;
    estFavoris: boolean;
};

export const getSuiviStatut = (suivi: SuiviState): SuiviStatut | null => {
    if (suivi.dateVisionnage) return SuiviStatut.VU;
    if (suivi.currentWatch !== null && suivi.currentWatch !== undefined) return SuiviStatut.EN_COURS;
    if (suivi.isWatchlist) return SuiviStatut.A_VOIR;
    return null;
}

export const isSuiviVide = (suivi: SuiviState): boolean =>
    getSuiviStatut(suivi) === null && !suivi.estFavoris;
