export type AppEvents = {
    'user.created': { id: number; identifiant: string; email: string };
    'user.deleted': { id: number };
    'anime.created': { id: number; titre: string };
};
