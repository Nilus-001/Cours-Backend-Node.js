SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `anime`;
CREATE TABLE `anime` (
  `id_anime` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `synopsis` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date_annonce` date DEFAULT NULL,
  `id_categorie` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_anime`),
  KEY `FK_b5d994c8f5d27f057f03f3f4a00` (`id_categorie`),
  CONSTRAINT `FK_b5d994c8f5d27f057f03f3f4a00` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `avis`;
CREATE TABLE `avis` (
  `id_avis` int(11) NOT NULL AUTO_INCREMENT,
  `commentaire` text DEFAULT NULL,
  `note_user` int(11) DEFAULT NULL,
  `date_avis` date DEFAULT NULL,
  `id_avis_1` int(11) DEFAULT NULL,
  `id_categ_user` int(11) DEFAULT NULL,
  `id_anime` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_avis`),
  KEY `FK_1a2347ac174b4aca863f8b95a08` (`id_avis_1`),
  KEY `FK_1288e90703774b8560e2d30955f` (`id_categ_user`),
  KEY `FK_8979f0148e8045f340268af9c26` (`id_anime`),
  KEY `FK_439881f2c91e1e857d772d7ea79` (`id_user`),
  CONSTRAINT `FK_1288e90703774b8560e2d30955f` FOREIGN KEY (`id_categ_user`) REFERENCES `categorie_appreciation` (`id_categ_user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_1a2347ac174b4aca863f8b95a08` FOREIGN KEY (`id_avis_1`) REFERENCES `avis` (`id_avis`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_439881f2c91e1e857d772d7ea79` FOREIGN KEY (`id_user`) REFERENCES `user_` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_8979f0148e8045f340268af9c26` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `categorie`;
CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `categorie_appreciation`;
CREATE TABLE `categorie_appreciation` (
  `id_categ_user` int(11) NOT NULL AUTO_INCREMENT,
  `categorie` varchar(255) NOT NULL,
  PRIMARY KEY (`id_categ_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `diffuser`;
CREATE TABLE `diffuser` (
  `id_saison` int(11) NOT NULL,
  `id_distrib` int(11) NOT NULL,
  `date_distribution` date DEFAULT NULL,
  PRIMARY KEY (`id_saison`,`id_distrib`),
  KEY `FK_341c652fc6319477dfaaadde4e7` (`id_distrib`),
  CONSTRAINT `FK_341c652fc6319477dfaaadde4e7` FOREIGN KEY (`id_distrib`) REFERENCES `distributeur` (`id_distrib`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_e1ef7a9fc461ea773c0de71938e` FOREIGN KEY (`id_saison`) REFERENCES `saison` (`id_saison`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `distributeur`;
CREATE TABLE `distributeur` (
  `id_distrib` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `dirigeant` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_distrib`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `doubler`;
CREATE TABLE `doubler` (
  `id_episode` int(11) NOT NULL,
  `id_langue` int(11) NOT NULL,
  PRIMARY KEY (`id_episode`,`id_langue`),
  KEY `IDX_77d8e5b014a35e001e77ca023b` (`id_episode`),
  KEY `IDX_8be288a73180d0a4051ea5336a` (`id_langue`),
  CONSTRAINT `FK_77d8e5b014a35e001e77ca023bf` FOREIGN KEY (`id_episode`) REFERENCES `episode` (`id_episode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_8be288a73180d0a4051ea5336a1` FOREIGN KEY (`id_langue`) REFERENCES `langue` (`id_langue`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `episode`;
CREATE TABLE `episode` (
  `id_episode` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `duree` int(11) DEFAULT NULL,
  `date_` date DEFAULT NULL,
  `num_episode` int(11) NOT NULL,
  `id_saison` int(11) DEFAULT NULL,
  `id_anime` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_episode`),
  KEY `FK_762d570a3efb0406ea7dd43e4e2` (`id_saison`),
  KEY `FK_d57a1c957bc81da0078ed63031f` (`id_anime`),
  CONSTRAINT `FK_762d570a3efb0406ea7dd43e4e2` FOREIGN KEY (`id_saison`) REFERENCES `saison` (`id_saison`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_d57a1c957bc81da0078ed63031f` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `est_attribuee`;
CREATE TABLE `est_attribuee` (
  `id_anime` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL,
  PRIMARY KEY (`id_anime`,`id_genre`),
  KEY `IDX_80ba8c2361f6c8697a9dd23018` (`id_anime`),
  KEY `IDX_5e818ffb6a549beb98b57f0362` (`id_genre`),
  CONSTRAINT `FK_5e818ffb6a549beb98b57f03629` FOREIGN KEY (`id_genre`) REFERENCES `genre` (`id_genre`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_80ba8c2361f6c8697a9dd230185` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `est_produit`;
CREATE TABLE `est_produit` (
  `id_episode` int(11) NOT NULL,
  `id_studio` int(11) NOT NULL,
  PRIMARY KEY (`id_episode`,`id_studio`),
  KEY `IDX_8c5dc492f438503e9438ff07c8` (`id_episode`),
  KEY `IDX_a252a98b30b41a9d35e47e48a0` (`id_studio`),
  CONSTRAINT `FK_8c5dc492f438503e9438ff07c84` FOREIGN KEY (`id_episode`) REFERENCES `episode` (`id_episode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_a252a98b30b41a9d35e47e48a08` FOREIGN KEY (`id_studio`) REFERENCES `studio` (`id_studio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `est_source`;
CREATE TABLE `est_source` (
  `id_anime` int(11) NOT NULL,
  `id_source` int(11) NOT NULL,
  PRIMARY KEY (`id_anime`,`id_source`),
  KEY `IDX_7fd5419f17db5f5b9d5851cb6c` (`id_anime`),
  KEY `IDX_b0d10c2408ce66e29b065f14a9` (`id_source`),
  CONSTRAINT `FK_7fd5419f17db5f5b9d5851cb6c3` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_b0d10c2408ce66e29b065f14a9e` FOREIGN KEY (`id_source`) REFERENCES `source` (`id_source`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre` (
  `id_genre` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id_genre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `langue`;
CREATE TABLE `langue` (
  `id_langue` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id_langue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `noter`;
CREATE TABLE `noter` (
  `id_anime` int(11) NOT NULL,
  `id_source_officiel` int(11) NOT NULL,
  `note` varchar(255) NOT NULL,
  PRIMARY KEY (`id_anime`,`id_source_officiel`),
  KEY `FK_701b684d36f1b3af930c054d029` (`id_source_officiel`),
  CONSTRAINT `FK_701b684d36f1b3af930c054d029` FOREIGN KEY (`id_source_officiel`) REFERENCES `source_officiel` (`id_source_officiel`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_bb9b0268fb3369ecceca2fee044` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `organiser`;
CREATE TABLE `organiser` (
  `id_anime` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  PRIMARY KEY (`id_anime`,`id_prod`),
  KEY `IDX_0fd969be3b0226eacd4425979d` (`id_anime`),
  KEY `IDX_21b9578ccc85ff729ed834ad53` (`id_prod`),
  CONSTRAINT `FK_0fd969be3b0226eacd4425979d7` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_21b9578ccc85ff729ed834ad531` FOREIGN KEY (`id_prod`) REFERENCES `producteur` (`id_prod`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `posseder`;
CREATE TABLE `posseder` (
  `id_anime` int(11) NOT NULL,
  `id_theme` int(11) NOT NULL,
  PRIMARY KEY (`id_anime`,`id_theme`),
  KEY `IDX_919adcfc635433b05b9c33cce0` (`id_anime`),
  KEY `IDX_04aaac2382fcce1f1123b2d621` (`id_theme`),
  CONSTRAINT `FK_04aaac2382fcce1f1123b2d621d` FOREIGN KEY (`id_theme`) REFERENCES `theme` (`id_theme`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_919adcfc635433b05b9c33cce01` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `producteur`;
CREATE TABLE `producteur` (
  `id_prod` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `refresh_token`;
CREATE TABLE `refresh_token` (
  `id_refresh_token` int(11) NOT NULL AUTO_INCREMENT,
  `token_hash` varchar(64) NOT NULL,
  `date_expiration` datetime NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_refresh_token`),
  UNIQUE KEY `IDX_f0812282fad2e352cdaf83ef0a` (`token_hash`),
  KEY `FK_fd79923e4359a26a971f841fb5e` (`id_user`),
  CONSTRAINT `FK_fd79923e4359a26a971f841fb5e` FOREIGN KEY (`id_user`) REFERENCES `user_` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `saison`;
CREATE TABLE `saison` (
  `id_saison` int(11) NOT NULL AUTO_INCREMENT,
  `num_saison` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_saison`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `source`;
CREATE TABLE `source` (
  `id_source` int(11) NOT NULL AUTO_INCREMENT,
  `auteur` varchar(255) DEFAULT NULL,
  `date_parution` date DEFAULT NULL,
  `id_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_source`),
  KEY `FK_abec3cf0adfe81cd588517d1b29` (`id_type`),
  CONSTRAINT `FK_abec3cf0adfe81cd588517d1b29` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `source_officiel`;
CREATE TABLE `source_officiel` (
  `id_source_officiel` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(255) NOT NULL,
  PRIMARY KEY (`id_source_officiel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `studio`;
CREATE TABLE `studio` (
  `id_studio` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `dirigeant` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_studio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `theme`;
CREATE TABLE `theme` (
  `id_theme` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id_theme`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id_type` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `user_`;
CREATE TABLE `user_` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `identifiant` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `perm` bigint(20) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `IDX_4c1dbeff0117f5fc980fcbfd0b` (`identifiant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `vu_or_a_voir`;
CREATE TABLE `vu_or_a_voir` (
  `id_anime` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date_visionnage` date DEFAULT NULL,
  `is_watchlist` tinyint(4) NOT NULL DEFAULT 0,
  `currentwatch` int(11) DEFAULT NULL,
  `ordre` int(11) DEFAULT NULL,
  `est_favoris` tinyint(4) NOT NULL DEFAULT 0,
  `classement_favoris` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_anime`,`id_user`),
  KEY `FK_ea879e88a6bca6095ca5926214f` (`id_user`),
  CONSTRAINT `FK_99f2ae9230b6dd3f79757f29314` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_ea879e88a6bca6095ca5926214f` FOREIGN KEY (`id_user`) REFERENCES `user_` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
