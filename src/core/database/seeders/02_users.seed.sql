-- Données de démo : utilisateurs, watchlist et avis (nécessite 01_catalogue.seed.sql)

-- Mot de passe de tous les comptes : password123

SET NAMES utf8mb4;

START TRANSACTION;

INSERT INTO `user_` (`id_user`, `identifiant`, `email`, `mot_de_passe`, `perm`) VALUES
(1, 'admin', 'admin@animeapi.local', '$2b$10$mVt0DQ0Vb3.SrnOqTpgix.CIIrO4mWJNQRfBDOiAQmQ3Q4z13jPqe', 4611686018427387935),
(2, 'first_user', 'user@animeapi.local', '$2b$10$mVt0DQ0Vb3.SrnOqTpgix.CIIrO4mWJNQRfBDOiAQmQ3Q4z13jPqe', 15),
(3, 'moderator', 'moderator@animeapi.local', '$2b$10$mVt0DQ0Vb3.SrnOqTpgix.CIIrO4mWJNQRfBDOiAQmQ3Q4z13jPqe', 47);

INSERT INTO `categorie_appreciation` (`id_categ_user`, `categorie`) VALUES
(1, 'Chef-d''œuvre'),
(2, 'Excellent'),
(3, 'Bon'),
(4, 'Moyen'),
(5, 'Décevant');

INSERT INTO `vu_or_a_voir` (`id_anime`, `id_user`, `date_visionnage`, `is_watchlist`, `currentwatch`, `ordre`, `est_favoris`, `classement_favoris`) VALUES
(6, 2, '2024-03-25', 0, 28, NULL, 1, 1),
(1, 2, '2023-06-10', 0, 64, NULL, 1, 2),
(7, 2, '2022-11-02', 0, 24, NULL, 1, 3),
(5, 2, NULL, 0, 15, NULL, 0, NULL),
(13, 2, NULL, 1, NULL, 1, 0, NULL),
(19, 2, NULL, 1, NULL, 2, 0, NULL),
(8, 2, NULL, 1, NULL, 3, 0, NULL),
(4, 1, '2023-01-15', 0, 26, NULL, 1, 2),
(9, 1, NULL, 0, 30, NULL, 1, 3),
(14, 1, NULL, 1, NULL, 1, 0, NULL),
(6, 1, NULL, 1, NULL, 2, 0, NULL),
(3, 1, '2021-04-04', 0, 59, NULL, 1, 1),
(12, 1, NULL, 0, 8, NULL, 0, NULL);

INSERT INTO `avis` (`id_avis`, `commentaire`, `note_user`, `date_avis`, `id_avis_1`, `id_categ_user`, `id_anime`, `id_user`) VALUES
(1, 'Une adaptation fidèle et magnifiquement rythmée, chaque épisode compte.', 10, '2024-03-26', NULL, 1, 6, 2),
(2, 'Totalement d''accord, la musique de la série est sublime.', NULL, '2024-03-28', 1, NULL, 6, 1),
(3, 'Un classique indémodable, l''histoire tient la route jusqu''au bout.', 10, '2023-06-11', NULL, 1, 1, 2),
(4, 'Les combats sont superbes mais le début est un peu lent.', 8, '2023-01-16', NULL, 2, 4, 1),
(5, 'Le combat contre Rui reste mémorable !', NULL, '2023-01-20', 4, NULL, 4, 2),
(6, 'Une saison 3 qui change complètement la dimension de l''histoire.', 9, '2021-04-05', NULL, 2, 3, 1),
(7, 'Le concept du voyage dans le temps est très bien exploité.', 9, '2022-11-03', NULL, 2, 7, 2),
(8, 'Sympathique et léger, parfait pour se détendre.', 7, '2024-02-10', NULL, 3, 9, 1);

COMMIT;
