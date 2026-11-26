const idParam = {
    name: "id",
    in: "path",
    required: true,
    schema: {type: "integer", minimum: 1}
};

const json = (schema: object) => ({"application/json": {schema}});
const ref = (name: string) => ({$ref: `#/components/schemas/${name}`});
const error = (description: string) => ({description, content: json(ref("Error"))});
const success = (description: string, data: object, meta?: object) => ({
    description,
    content: json({type: "object", properties: meta ? {data, meta} : {data}})
});
const bearer = [{bearerAuth: []}];

const idArray = {type: "array", uniqueItems: true, items: {type: "integer", minimum: 1}};

const watchlistListMeta = {
    type: "object",
    properties: {
        filtres: {
            type: "object",
            properties: {
                statut: {type: "string", nullable: true}
            }
        },
        total: {type: "integer"}
    }
};

const favoriteListMeta = {
    type: "object",
    properties: {
        total: {type: "integer"}
    }
};

const avisListMeta = {
    type: "object",
    properties: {
        noteMoyenne: {type: "number", nullable: true, example: 8.33},
        nombreNotes: {type: "integer"},
        total: {type: "integer", description: "Nombre d'avis racines"},
        totalMessages: {type: "integer", description: "Avis + réponses"}
    }
};

export const openapiSpec = {
    openapi: "3.0.3",
    info: {
        title: "Anime API",
        version: "1.0.0"
    },
    servers: [{url: "http://localhost:8080"}],
    tags: [
        {name: "Auth"},
        {name: "Users"},
        {name: "Animes"},
        {name: "Watchlist"},
        {name: "Favorites"},
        {name: "Avis"}
    ],
    components: {
        securitySchemes: {
            bearerAuth: {type: "http", scheme: "bearer", bearerFormat: "JWT"}
        },
        schemas: {
            Error: {
                type: "object",
                properties: {
                    code: {type: "integer", example: 400},
                    errCode: {type: "string", example: "Err-validate-400"},
                    message: {type: "string", example: "Validation failed"},
                    meta: {type: "object", nullable: true}
                }
            },
            Libelle: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    libelle: {type: "string"}
                }
            },
            Nom: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    nom: {type: "string"}
                }
            },
            AnimeSource: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    auteur: {type: "string", nullable: true},
                    dateParution: {type: "string", format: "date", nullable: true},
                    type: {allOf: [ref("Libelle")], nullable: true}
                }
            },
            Anime: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    nom: {type: "string"},
                    synopsis: {type: "string", nullable: true},
                    image: {type: "string", format: "uri", nullable: true},
                    dateAnnonce: {type: "string", format: "date", nullable: true},
                    categorie: {allOf: [ref("Libelle")], nullable: true},
                    genres: {type: "array", items: ref("Libelle")},
                    themes: {type: "array", items: ref("Libelle")},
                    producteurs: {type: "array", items: ref("Nom")},
                    sources: {type: "array", items: ref("AnimeSource")},
                    noteMoyenne: {type: "number", nullable: true, description: "Moyenne des notes des avis racines", example: 8.33},
                    nombreNotes: {type: "integer"}
                }
            },
            AnimeCreate: {
                type: "object",
                required: ["nom"],
                additionalProperties: false,
                properties: {
                    nom: {type: "string", minLength: 1},
                    synopsis: {type: "string", nullable: true},
                    image: {type: "string", format: "uri", nullable: true},
                    dateAnnonce: {type: "string", format: "date", nullable: true},
                    idCategorie: {type: "integer", minimum: 1, nullable: true},
                    idGenres: idArray,
                    idThemes: idArray,
                    idProducteurs: idArray,
                    idSources: idArray
                }
            },
            AnimeUpdate: {
                type: "object",
                additionalProperties: false,
                properties: {
                    nom: {type: "string", minLength: 1},
                    synopsis: {type: "string", nullable: true},
                    image: {type: "string", format: "uri", nullable: true},
                    dateAnnonce: {type: "string", format: "date", nullable: true},
                    idCategorie: {type: "integer", minimum: 1, nullable: true},
                    idGenres: idArray,
                    idThemes: idArray,
                    idProducteurs: idArray,
                    idSources: idArray
                }
            },
            User: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    identifiant: {type: "string"},
                    email: {type: "string", format: "email"},
                    perm: {type: "string", pattern: "^[0-9]+$", description: "Bitfield des permissions (BigInt en string)", example: "15"}
                }
            },
            UserPublic: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    identifiant: {type: "string"}
                }
            },
            UserPerm: {
                type: "object",
                required: ["perm"],
                additionalProperties: false,
                properties: {
                    perm: {type: "string", pattern: "^[0-9]+$", description: "Nouvelle valeur complète des permissions", example: "15"}
                }
            },
            UserCreate: {
                type: "object",
                required: ["identifiant", "email", "motDePasse"],
                additionalProperties: false,
                properties: {
                    identifiant: {type: "string", minLength: 3, maxLength: 50, pattern: "^[a-zA-Z0-9._-]+$"},
                    email: {type: "string", format: "email", maxLength: 255},
                    motDePasse: {type: "string", format: "password", minLength: 8, maxLength: 72}
                }
            },
            UserUpdate: {
                type: "object",
                additionalProperties: false,
                properties: {
                    identifiant: {type: "string", minLength: 3, maxLength: 50, pattern: "^[a-zA-Z0-9._-]+$"},
                    email: {type: "string", format: "email", maxLength: 255},
                    motDePasse: {type: "string", format: "password", minLength: 8, maxLength: 72}
                }
            },
            Login: {
                type: "object",
                required: ["identifiant", "motDePasse"],
                additionalProperties: false,
                properties: {
                    identifiant: {type: "string"},
                    motDePasse: {type: "string", format: "password"}
                }
            },
            RefreshToken: {
                type: "object",
                required: ["refreshToken"],
                additionalProperties: false,
                properties: {
                    refreshToken: {type: "string"}
                }
            },
            TokenPair: {
                type: "object",
                properties: {
                    accessToken: {type: "string"},
                    refreshToken: {type: "string"}
                }
            },
            AnimeResume: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    nom: {type: "string"},
                    image: {type: "string", nullable: true}
                }
            },
            Watchlist: {
                type: "object",
                properties: {
                    anime: ref("AnimeResume"),
                    statut: {type: "string", enum: ["a_voir", "en_cours", "vu"]},
                    episodeActuel: {type: "integer", nullable: true},
                    dateVisionnage: {type: "string", format: "date", nullable: true},
                    ordre: {type: "integer", nullable: true}
                }
            },
            Favorite: {
                type: "object",
                properties: {
                    anime: ref("AnimeResume"),
                    classement: {type: "integer", nullable: true}
                }
            },
            Progress: {
                type: "object",
                properties: {
                    episode: {type: "integer", minimum: 0, nullable: true},
                    termine: {type: "boolean"}
                }
            },
            AnimeOrdre: {
                type: "object",
                required: ["idAnimes"],
                properties: {
                    idAnimes: idArray
                }
            },
            Avis: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    anime: ref("Nom"),
                    idAvisParent: {type: "integer", nullable: true},
                    auteur: ref("UserPublic"),
                    note: {type: "integer", minimum: 0, maximum: 10, nullable: true},
                    commentaire: {type: "string", nullable: true},
                    categorie: {allOf: [ref("Libelle")], nullable: true},
                    date: {type: "string", format: "date", nullable: true}
                }
            },
            AvisFil: {
                allOf: [ref("Avis"), {
                    type: "object",
                    properties: {
                        reponses: {type: "array", items: ref("AvisFil")}
                    }
                }]
            },
            AvisCreate: {
                type: "object",
                required: ["note"],
                additionalProperties: false,
                properties: {
                    note: {type: "integer", minimum: 0, maximum: 10},
                    commentaire: {type: "string", maxLength: 2000, nullable: true},
                    idCategorie: {type: "integer", minimum: 1, nullable: true}
                }
            },
            AvisUpdate: {
                type: "object",
                additionalProperties: false,
                description: "Sur une réponse, seul commentaire est accepté",
                properties: {
                    note: {type: "integer", minimum: 0, maximum: 10},
                    commentaire: {type: "string", maxLength: 2000, nullable: true},
                    idCategorie: {type: "integer", minimum: 1, nullable: true}
                }
            },
            ReponseCreate: {
                type: "object",
                required: ["commentaire"],
                additionalProperties: false,
                properties: {
                    commentaire: {type: "string", minLength: 1, maxLength: 2000}
                }
            }
        }
    },
    paths: {
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Connexion",
                requestBody: {required: true, content: json(ref("Login"))},
                responses: {
                    200: success("Tokens", ref("TokenPair")),
                    400: error("Validation échouée"),
                    401: error("Identifiant ou mot de passe incorrect")
                }
            }
        },
        "/auth/refresh": {
            post: {
                tags: ["Auth"],
                summary: "Renouveler les tokens",
                requestBody: {required: true, content: json(ref("RefreshToken"))},
                responses: {
                    200: success("Nouveaux tokens", ref("TokenPair")),
                    400: error("Validation échouée"),
                    401: error("Refresh token invalide, expiré ou réutilisé")
                }
            }
        },
        "/auth/logout": {
            post: {
                tags: ["Auth"],
                summary: "Déconnexion de la session (révoque l'access token et le refresh token)",
                security: bearer,
                requestBody: {required: true, content: json(ref("RefreshToken"))},
                responses: {
                    204: {description: "Déconnecté"},
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        },
        "/auth/logout-all": {
            post: {
                tags: ["Auth"],
                summary: "Déconnexion de toutes les sessions",
                security: bearer,
                responses: {
                    204: {description: "Toutes les sessions fermées"},
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        },
        "/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Utilisateur connecté",
                security: bearer,
                responses: {
                    200: success("Utilisateur", ref("User")),
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        },
        "/user": {
            get: {
                tags: ["Users"],
                summary: "Lister les utilisateurs",
                parameters: [
                    {name: "identifiant", in: "query", schema: {type: "string"}}
                ],
                responses: {
                    200: success("Utilisateurs", {type: "array", items: ref("UserPublic")}, {type: "object", properties: {total: {type: "integer"}}}),
                    400: error("Validation échouée")
                }
            }
        },
        "/user/add": {
            post: {
                tags: ["Users"],
                summary: "Créer un utilisateur",
                requestBody: {required: true, content: json(ref("UserCreate"))},
                responses: {
                    201: success("Utilisateur créé", ref("User")),
                    400: error("Validation échouée"),
                    409: error("Identifiant déjà utilisé")
                }
            }
        },
        "/user/{id}": {
            get: {
                tags: ["Users"],
                summary: "Récupérer un utilisateur",
                parameters: [idParam],
                responses: {
                    200: success("Utilisateur", ref("UserPublic")),
                    400: error("Validation échouée"),
                    404: error("Utilisateur introuvable")
                }
            }
        },
        "/user/{id}/update": {
            patch: {
                tags: ["Users"],
                summary: "Modifier un compte (le sien, ou un autre avec MANAGE_USERS)",
                security: bearer,
                parameters: [idParam],
                requestBody: {required: true, content: json(ref("UserUpdate"))},
                responses: {
                    200: success("Utilisateur modifié", ref("User")),
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    403: error("Action sur un autre compte sans MANAGE_USERS"),
                    404: error("Utilisateur introuvable"),
                    409: error("Identifiant déjà utilisé")
                }
            }
        },
        "/user/{id}/perm": {
            patch: {
                tags: ["Users"],
                summary: "Modifier les permissions d'un utilisateur (admin)",
                security: bearer,
                parameters: [idParam],
                requestBody: {required: true, content: json(ref("UserPerm"))},
                responses: {
                    200: success("Permissions modifiées", ref("User")),
                    400: error("Validation échouée ou permission inconnue"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    403: error("Permission insuffisante"),
                    404: error("Utilisateur introuvable")
                }
            }
        },
        "/user/{id}/delete": {
            delete: {
                tags: ["Users"],
                summary: "Supprimer un compte (le sien, ou un autre avec MANAGE_USERS)",
                security: bearer,
                parameters: [idParam],
                responses: {
                    204: {description: "Utilisateur supprimé"},
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    403: error("Action sur un autre compte sans MANAGE_USERS"),
                    404: error("Utilisateur introuvable"),
                    409: error("L'utilisateur a des avis ou des animes dans sa liste")
                }
            }
        },
        "/anime": {
            get: {
                tags: ["Animes"],
                summary: "Lister les animes",
                parameters: [
                    {name: "nom", in: "query", schema: {type: "string"}},
                    {name: "dateAnnonce", in: "query", schema: {type: "string", format: "date"}},
                    {name: "idCategorie", in: "query", schema: {type: "integer", minimum: 1}},
                    {name: "idGenre", in: "query", schema: {type: "integer", minimum: 1}},
                    {name: "idTheme", in: "query", schema: {type: "integer", minimum: 1}}
                ],
                responses: {
                    200: success("Animes", {type: "array", items: ref("Anime")}, {type: "object", properties: {filtres: {type: "object"}, total: {type: "integer"}}}),
                    400: error("Validation échouée")
                }
            }
        },
        "/anime/add": {
            post: {
                tags: ["Animes"],
                summary: "Créer un anime",
                security: bearer,
                requestBody: {required: true, content: json(ref("AnimeCreate"))},
                responses: {
                    201: success("Anime créé", ref("Anime")),
                    400: error("Validation échouée ou référence inexistante"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    403: error("Permission CREATE_ANIME requise")
                }
            }
        },
        "/anime/{id}": {
            get: {
                tags: ["Animes"],
                summary: "Récupérer un anime",
                parameters: [idParam],
                responses: {
                    200: success("Anime", ref("Anime")),
                    400: error("Validation échouée"),
                    404: error("Anime introuvable")
                }
            }
        },
        "/anime/{id}/update": {
            patch: {
                tags: ["Animes"],
                summary: "Modifier un anime",
                security: bearer,
                parameters: [idParam],
                requestBody: {required: true, content: json(ref("AnimeUpdate"))},
                responses: {
                    200: success("Anime modifié", ref("Anime")),
                    400: error("Validation échouée ou référence inexistante"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    403: error("Permission EDIT_ANIME requise"),
                    404: error("Anime introuvable")
                }
            }
        },
        "/anime/{id}/delete": {
            delete: {
                tags: ["Animes"],
                summary: "Supprimer un anime",
                security: bearer,
                parameters: [idParam],
                responses: {
                    204: {description: "Anime supprimé"},
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    403: error("Permission DELETE_ANIME requise"),
                    404: error("Anime introuvable"),
                    409: error("L'anime possède des épisodes")
                }
            }
        },
        "/user/me/watchlist": {
            get: {
                tags: ["Watchlist"],
                summary: "Lister les animes suivis (à voir, en cours, vus)",
                security: bearer,
                parameters: [{name: "statut", in: "query", schema: {type: "string", enum: ["a_voir", "en_cours", "vu"]}}],
                responses: {
                    200: success("Animes suivis", {type: "array", items: ref("Watchlist")}, watchlistListMeta),
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        },
        "/user/me/watchlist/order": {
            patch: {
                tags: ["Watchlist"],
                summary: "Réordonner les animes à voir",
                security: bearer,
                requestBody: {required: true, content: json(ref("AnimeOrdre"))},
                responses: {
                    200: success("Animes à voir réordonnés", {type: "array", items: ref("Watchlist")}, watchlistListMeta),
                    400: error("Validation échouée ou liste incomplète"),
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        },
        "/anime/{id}/tracking": {
            get: {
                tags: ["Watchlist"],
                summary: "Statut de visionnage de l'anime pour l'utilisateur connecté",
                security: bearer,
                parameters: [idParam],
                responses: {
                    200: success("Suivi", ref("Watchlist")),
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime non suivi")
                }
            },
            delete: {
                tags: ["Watchlist"],
                summary: "Supprimer le suivi de visionnage (le favori est conservé)",
                security: bearer,
                parameters: [idParam],
                responses: {
                    204: {description: "Suivi supprimé"},
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime non suivi")
                }
            }
        },
        "/anime/{id}/watchlist": {
            post: {
                tags: ["Watchlist"],
                summary: "Ajouter l'anime à la watchlist",
                security: bearer,
                parameters: [idParam],
                responses: {
                    201: success("Suivi", ref("Watchlist")),
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime introuvable"),
                    409: error("Déjà dans la watchlist, commencé ou vu")
                }
            },
            delete: {
                tags: ["Watchlist"],
                summary: "Retirer l'anime de la watchlist",
                security: bearer,
                parameters: [idParam],
                responses: {
                    204: {description: "Retiré de la watchlist"},
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime absent de la watchlist")
                }
            }
        },
        "/anime/{id}/progress": {
            patch: {
                tags: ["Watchlist"],
                summary: "Mettre à jour la progression (épisode actuel, terminé)",
                security: bearer,
                parameters: [idParam],
                requestBody: {required: true, content: json(ref("Progress"))},
                responses: {
                    200: success("Suivi", ref("Watchlist")),
                    204: {description: "Progression vidée, suivi supprimé"},
                    400: error("Validation échouée, corps vide ou épisode hors limite"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime introuvable")
                }
            }
        },
        "/user/me/favorites": {
            get: {
                tags: ["Favorites"],
                summary: "Lister les favoris par classement",
                security: bearer,
                responses: {
                    200: success("Favoris", {type: "array", items: ref("Favorite")}, favoriteListMeta),
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        },
        "/user/me/favorites/order": {
            patch: {
                tags: ["Favorites"],
                summary: "Réordonner les favoris",
                security: bearer,
                requestBody: {required: true, content: json(ref("AnimeOrdre"))},
                responses: {
                    200: success("Favoris réordonnés", {type: "array", items: ref("Favorite")}, favoriteListMeta),
                    400: error("Validation échouée ou liste incomplète"),
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        },
        "/anime/{id}/favorite": {
            get: {
                tags: ["Favorites"],
                summary: "Favori de l'anime pour l'utilisateur connecté",
                security: bearer,
                parameters: [idParam],
                responses: {
                    200: success("Favori", ref("Favorite")),
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime absent des favoris")
                }
            },
            post: {
                tags: ["Favorites"],
                summary: "Ajouter l'anime aux favoris",
                security: bearer,
                parameters: [idParam],
                responses: {
                    201: success("Favori", ref("Favorite")),
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime introuvable"),
                    409: error("Déjà en favori")
                }
            },
            delete: {
                tags: ["Favorites"],
                summary: "Retirer l'anime des favoris",
                security: bearer,
                parameters: [idParam],
                responses: {
                    204: {description: "Retiré des favoris"},
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime absent des favoris")
                }
            }
        },
        "/anime/{id}/reviews": {
            get: {
                tags: ["Avis"],
                summary: "Lister les avis d'un anime en fils de discussion, avec la note moyenne",
                parameters: [idParam],
                responses: {
                    200: success("Avis", {type: "array", items: ref("AvisFil")}, avisListMeta),
                    400: error("Validation échouée"),
                    404: error("Anime introuvable")
                }
            },
            post: {
                tags: ["Avis"],
                summary: "Publier un avis noté (un seul par utilisateur et par anime)",
                security: bearer,
                parameters: [idParam],
                requestBody: {required: true, content: json(ref("AvisCreate"))},
                responses: {
                    201: success("Avis", ref("Avis")),
                    400: error("Validation échouée ou catégorie inexistante"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime introuvable"),
                    409: error("Avis déjà publié sur cet anime")
                }
            }
        },
        "/reviews/categories": {
            get: {
                tags: ["Avis"],
                summary: "Lister les catégories d'appréciation",
                responses: {
                    200: success("Catégories", {type: "array", items: ref("Libelle")})
                }
            }
        },
        "/reviews/{id}": {
            get: {
                tags: ["Avis"],
                summary: "Détail d'un avis avec ses réponses",
                parameters: [idParam],
                responses: {
                    200: success("Avis", ref("AvisFil")),
                    400: error("Validation échouée"),
                    404: error("Avis introuvable")
                }
            },
            patch: {
                tags: ["Avis"],
                summary: "Modifier son avis ou sa réponse",
                security: bearer,
                parameters: [idParam],
                requestBody: {required: true, content: json(ref("AvisUpdate"))},
                responses: {
                    200: success("Avis", ref("Avis")),
                    400: error("Validation échouée, corps vide, catégorie inexistante ou champ interdit sur une réponse"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    403: error("Réservé à l'auteur"),
                    404: error("Avis introuvable")
                }
            },
            delete: {
                tags: ["Avis"],
                summary: "Supprimer un avis et ses réponses (auteur ou MODERATE_REVIEWS)",
                security: bearer,
                parameters: [idParam],
                responses: {
                    204: {description: "Avis supprimé"},
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    403: error("Réservé à l'auteur ou à un modérateur"),
                    404: error("Avis introuvable")
                }
            }
        },
        "/reviews/{id}/replies": {
            post: {
                tags: ["Avis"],
                summary: "Répondre à un avis ou à une réponse",
                security: bearer,
                parameters: [idParam],
                requestBody: {required: true, content: json(ref("ReponseCreate"))},
                responses: {
                    201: success("Réponse", ref("Avis")),
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Avis introuvable")
                }
            }
        },
        "/user/me/reviews": {
            get: {
                tags: ["Avis"],
                summary: "Lister mes avis et réponses",
                security: bearer,
                responses: {
                    200: success("Avis", {type: "array", items: ref("Avis")}, {type: "object", properties: {total: {type: "integer"}}}),
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        }
    }
};
