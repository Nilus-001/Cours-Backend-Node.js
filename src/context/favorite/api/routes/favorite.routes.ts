import {Router} from 'express';
import * as favoriteController from "../controllers/favorite.controller";
import {ValidateDto} from '../../../../core/http/validations/validate';
import {authenticate} from '../../../auth/infra/guards/auth.guard';
import {AnimeIdParamDto} from '../../../anime/api/dtos/anime.dto';
import {FavoriteOrderDto} from '../dtos/favorite.dto';

export const userFavoriteRoutes = Router();

userFavoriteRoutes.get('/favorites', authenticate, favoriteController.getFavorites);
userFavoriteRoutes.patch('/favorites/order', authenticate, ValidateDto(FavoriteOrderDto), favoriteController.reorderFavorites);

export const animeFavoriteRoutes = Router();

const animeId = [authenticate, ValidateDto(AnimeIdParamDto, "params")];

animeFavoriteRoutes.get('/:id/favorite', ...animeId, favoriteController.getFavorite);
animeFavoriteRoutes.post('/:id/favorite', ...animeId, favoriteController.addFavorite);
animeFavoriteRoutes.delete('/:id/favorite', ...animeId, favoriteController.removeFavorite);
