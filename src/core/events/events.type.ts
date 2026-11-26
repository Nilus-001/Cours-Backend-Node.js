export type AppEvents = {
    'user.created': { id: number; identifiant: string; email: string };
    'user.deleted': { id: number };
    'user.perm.updated': { id: number };
    'auth.logout': { jti: string; exp: number };
    'auth.logout-all': { userId: number };
};
