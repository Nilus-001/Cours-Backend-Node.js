export const Perm = Object.freeze({
    VIEW_ANIME:     1n << 0n,
    CREATE_ANIME:   1n << 1n,
    EDIT_ANIME:     1n << 2n,
    DELETE_ANIME:   1n << 3n,
    MANAGE_USERS:   1n << 4n,
    MODERATE_REVIEWS: 1n << 5n,
    ADMINISTRATOR:  1n << 62n,
});


export const USER_PERMS = Perm.VIEW_ANIME | Perm.CREATE_ANIME | Perm.EDIT_ANIME | Perm.DELETE_ANIME;

export const ALL_PERMS = Object.values(Perm).reduce((acc, p) => acc | p, 0n);
