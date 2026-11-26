import {AnimeEntity} from "../../context/anime/infra/persistances/entities/anime.entity";
import {AvisEntity} from "../../entities/avis.entity";
import {CategorieEntity} from "../../context/anime/infra/persistances/entities/categorie.entity";
import {CategorieAppreciationEntity} from "../../entities/categorie-appreciation.entity";
import {DiffuserEntity} from "../../context/anime/infra/persistances/entities/diffuser.entity";
import {DistributeurEntity} from "../../context/anime/infra/persistances/entities/distributeur.entity";
import {EpisodeEntity} from "../../context/anime/infra/persistances/entities/episode.entity";
import {GenreEntity} from "../../context/anime/infra/persistances/entities/genre.entity";
import {LangueEntity} from "../../context/anime/infra/persistances/entities/langue.entity";
import {NoterEntity} from "../../context/anime/infra/persistances/entities/noter.entity";
import {ProducteurEntity} from "../../context/anime/infra/persistances/entities/producteur.entity";
import {RefreshTokenEntity} from "../../context/auth/infra/persistances/entities/refresh-token.entity";
import {SaisonEntity} from "../../context/anime/infra/persistances/entities/saison.entity";
import {SourceEntity} from "../../context/anime/infra/persistances/entities/source.entity";
import {SourceOfficielEntity} from "../../context/anime/infra/persistances/entities/source-officiel.entity";
import {StudioEntity} from "../../context/anime/infra/persistances/entities/studio.entity";
import {ThemeEntity} from "../../context/anime/infra/persistances/entities/theme.entity";
import {TypeEntity} from "../../context/anime/infra/persistances/entities/type.entity";
import {UserEntity} from "../../context/user/infra/persistances/entities/user.entity";
import {WatchlistEntity} from "../../context/watchlist/infra/persistances/entities/watchlist.entity";
import {FavoriteEntity} from "../../context/favorite/infra/persistances/entities/favorite.entity";

export const entities = [
    AnimeEntity,
    AvisEntity,
    CategorieEntity,
    CategorieAppreciationEntity,
    DiffuserEntity,
    DistributeurEntity,
    EpisodeEntity,
    GenreEntity,
    LangueEntity,
    NoterEntity,
    ProducteurEntity,
    RefreshTokenEntity,
    SaisonEntity,
    SourceEntity,
    SourceOfficielEntity,
    StudioEntity,
    ThemeEntity,
    TypeEntity,
    UserEntity,
    WatchlistEntity,
    FavoriteEntity,
];
