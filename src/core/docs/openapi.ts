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

const suiviListMeta = {
    type: "object",
    properties: {
        filtres: {
            type: "object",
            properties: {
                statut: {type: "string", nullable: true},
                favori: {type: "boolean", nullable: true}
            }
        },
        total: {type: "integer"}
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
        {name: "Watchlist"}
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
                    sources: {type: "array", items: ref("AnimeSource")}
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
            Suivi: {
                type: "object",
                properties: {
                    anime: {
                        type: "object",
                        properties: {
                            id: {type: "integer"},
                            nom: {type: "string"},
                            image: {type: "string", nullable: true}
                        }
                    },
                    statut: {type: "string", enum: ["a_voir", "en_cours", "vu"], nullable: true},
                    episodeActuel: {type: "integer", nullable: true},
                    dateVisionnage: {type: "string", format: "date", nullable: true},
                    ordre: {type: "integer", nullable: true},
                    favori: {type: "boolean"},
                    classementFavori: {type: "integer", nullable: true}
                }
            },
            Progress: {
                type: "object",
                properties: {
                    episode: {type: "integer", minimum: 0, nullable: true},
                    termine: {type: "boolean"}
                }
            },
            SuiviOrdre: {
                type: "object",
                required: ["idAnimes"],
                properties: {
                    idAnimes: idArray
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
                summary: "Lister les animes suivis",
                security: bearer,
                parameters: [
                    {name: "statut", in: "query", schema: {type: "string", enum: ["a_voir", "en_cours", "vu"]}},
                    {name: "favori", in: "query", schema: {type: "boolean"}}
                ],
                responses: {
                    200: success("Suivis", {type: "array", items: ref("Suivi")}, suiviListMeta),
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
                requestBody: {required: true, content: json(ref("SuiviOrdre"))},
                responses: {
                    200: success("Animes à voir réordonnés", {type: "array", items: ref("Suivi")}, suiviListMeta),
                    400: error("Validation échouée ou liste incomplète"),
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        },
        "/user/me/favorites": {
            get: {
                tags: ["Watchlist"],
                summary: "Lister les favoris par classement",
                security: bearer,
                responses: {
                    200: success("Favoris", {type: "array", items: ref("Suivi")}, suiviListMeta),
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        },
        "/user/me/favorites/order": {
            patch: {
                tags: ["Watchlist"],
                summary: "Réordonner les favoris",
                security: bearer,
                requestBody: {required: true, content: json(ref("SuiviOrdre"))},
                responses: {
                    200: success("Favoris réordonnés", {type: "array", items: ref("Suivi")}, suiviListMeta),
                    400: error("Validation échouée ou liste incomplète"),
                    401: error("Token manquant, expiré, invalide ou révoqué")
                }
            }
        },
        "/anime/{id}/tracking": {
            get: {
                tags: ["Watchlist"],
                summary: "Suivi de l'anime pour l'utilisateur connecté",
                security: bearer,
                parameters: [idParam],
                responses: {
                    200: success("Suivi", ref("Suivi")),
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime non suivi")
                }
            },
            delete: {
                tags: ["Watchlist"],
                summary: "Supprimer tout le suivi de l'anime",
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
                    201: success("Suivi", ref("Suivi")),
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
                    200: success("Suivi", ref("Suivi")),
                    204: {description: "Suivi vidé et supprimé"},
                    400: error("Validation échouée, corps vide ou épisode hors limite"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime introuvable")
                }
            }
        },
        "/anime/{id}/favorite": {
            post: {
                tags: ["Watchlist"],
                summary: "Ajouter l'anime aux favoris",
                security: bearer,
                parameters: [idParam],
                responses: {
                    201: success("Suivi", ref("Suivi")),
                    400: error("Validation échouée"),
                    401: error("Token manquant, expiré, invalide ou révoqué"),
                    404: error("Anime introuvable"),
                    409: error("Déjà en favori")
                }
            },
            delete: {
                tags: ["Watchlist"],
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
        }
    }
};
