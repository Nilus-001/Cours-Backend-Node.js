# AnimeAPI

API REST Node.js (Express 5 + TypeScript) de gestion d'animes et d'utilisateurs, avec authentification JWT, permissions, base MySQL via TypeORM et envoi de mails via Nodemailer.

Architecture découpée par contexte (`anime`, `user`, `auth`) en couches `api` / `app` / `domain` / `infra`.

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
1. Créer la base MySQL indiquée dans `DB_DATABASE` :

   ```
   mysql -u <user> -p -e "CREATE DATABASE <DB_DATABASE> CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   ```

2. Créer les tables, au choix :

   - **Import du script SQL** : `synchronize` est désactivé par défaut, donc TypeORM ne crée pas les tables. Importer le schéma :

     ```
     mysql -u <user> -p <DB_DATABASE> < sql/schema.sql
     ```

   - **Génération automatique** : passer `synchronize: true` dans `src/core/configs/database/typeorm.config.ts`. TypeORM crée alors les tables au démarrage de l'API. À utiliser uniquement en développement.

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
