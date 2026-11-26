# AnimeAPI

API REST Node.js (Express 5 + TypeScript) de gestion d'animes et d'utilisateurs, avec authentification JWT, permissions, base MySQL via TypeORM et envoi de mails via Nodemailer.

Architecture découpée par contexte (`anime`, `user`, `auth`, `watchlist`, `favorite`) en couches `api` / `app` / `domain` / `infra`.

## Prérequis

- Node.js 20.6+
- MySQL / MariaDB
- Un serveur SMTP (ex. [Mailpit](https://mailpit.axllent.org/) en local)

## Installation

```bash
npm install
```

## Setup

### Environnement

```bash
cp .env.example .env
```

Puis renseigner les valeurs, et ajouter le port de l'application :

```env
APP_PORT=3000
```

| Groupe | Variables |
|---|---|
| App | `APP_PORT` |
| JWT | `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN` |
| Base de données | `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` |
| Mailer | `MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_USER`, `MAIL_PASSWORD`, `MAIL_FROM` |

### Base de données

Les commandes suivantes utilisent les identifiants du `.env` et fonctionnent sous Windows, macOS et Linux, sans client `mysql` installé. La base `DB_DATABASE` est créée automatiquement si elle n'existe pas.

| Commande | Action |
|---|---|
| `npm run db:schema` | Crée les tables (supprime les tables existantes et leurs données) |
| `npm run db:seed` | Remplit la base avec des données de démo (vide toutes les tables) |
| `npm run db:reset` | Enchaîne `db:schema` puis `db:seed` |

Installation complète avec les données de démo :

```bash
npm run db:reset
```

Comptes de démo : `admin`, `first_user` — mot de passe `password123`.

Alternative à `db:schema` : passer `synchronize: true` dans `src/core/configs/database/typeorm.config.ts`. TypeORM crée alors les tables au démarrage de l'API. À utiliser uniquement en développement.

### Mailer

Le serveur vérifie la connexion SMTP au démarrage. En local, lancer Mailpit :

```bash
docker run -d -p 1025:1025 -p 8025:8025 axllent/mailpit
```

Interface des mails reçus : http://localhost:8025

## Exécution

```bash
npm run dev
```

```bash
npm start
```

Documentation Swagger : http://localhost:3000/api-docs

## Routes

🔒 = authentification requise (`Authorization: Bearer <token>`)

### Auth — `/auth`

| Méthode | Route | Accès |
|---|---|---|
| POST | `/auth/login` | Public |
| POST | `/auth/refresh` | Public |
| POST | `/auth/logout` | 🔒 |
| POST | `/auth/logout-all` | 🔒 |
| GET | `/auth/me` | 🔒 |

### Anime — `/anime`

| Méthode | Route | Accès |
|---|---|---|
| GET | `/anime` | Public |
| GET | `/anime/:id` | Public |
| POST | `/anime/add` | 🔒 `CREATE_ANIME` |
| PATCH | `/anime/:id/update` | 🔒 `EDIT_ANIME` |
| DELETE | `/anime/:id/delete` | 🔒 `DELETE_ANIME` |

### User — `/user`

| Méthode | Route | Accès |
|---|---|---|
| GET | `/user` | Public |
| GET | `/user/:id` | Public |
| POST | `/user/add` | Public |
| PATCH | `/user/:id/update` | 🔒 Soi-même ou `MANAGE_USERS` |
| PATCH | `/user/:id/perm` | 🔒 `ADMINISTRATOR` |
| DELETE | `/user/:id/delete` | 🔒 Soi-même ou `MANAGE_USERS` |

### Watchlist — suivi de visionnage

Statuts : `a_voir`, `en_cours`, `vu`. Atteindre le dernier épisode marque l'anime comme vu.

| Méthode | Route | Accès |
|---|---|---|
| GET | `/user/me/watchlist?statut=` | 🔒 |
| PATCH | `/user/me/watchlist/order` | 🔒 |
| GET | `/anime/:id/tracking` | 🔒 |
| DELETE | `/anime/:id/tracking` | 🔒 |
| POST | `/anime/:id/watchlist` | 🔒 |
| DELETE | `/anime/:id/watchlist` | 🔒 |
| PATCH | `/anime/:id/progress` | 🔒 |

### Favorites — favoris

| Méthode | Route | Accès |
|---|---|---|
| GET | `/user/me/favorites` | 🔒 |
| PATCH | `/user/me/favorites/order` | 🔒 |
| GET | `/anime/:id/favorite` | 🔒 |
| POST | `/anime/:id/favorite` | 🔒 |
| DELETE | `/anime/:id/favorite` | 🔒 |

Les deux contextes partagent la table `vu_or_a_voir` mais chacun ne gère que ses propres colonnes : l'un peut être retiré sans impacter l'autre.
