import {Router} from 'express';
import * as suiviController from "../controllers/suivi.controller";
import {ValidateDto} from '../../../../core/http/validations/validate';
import {authenticate} from '../../../auth/infra/guards/auth.guard';
import {AnimeIdParamDto} from '../../../anime/api/dtos/anime.dto';
import {ProgressDto, SuiviFilterDto, SuiviOrdreDto} from '../dtos/suivi.dto';

export const userSuiviRoutes = Router();

userSuiviRoutes.get('/watchlist', authenticate, ValidateDto(SuiviFilterDto, "query"), suiviController.getWatchlist);
userSuiviRoutes.patch('/watchlist/order', authenticate, ValidateDto(SuiviOrdreDto), suiviController.reorderWatchlist);
userSuiviRoutes.get('/favorites', authenticate, suiviController.getFavoris);
userSuiviRoutes.patch('/favorites/order', authenticate, ValidateDto(SuiviOrdreDto), suiviController.reorderFavoris);

export const animeSuiviRoutes = Router();

const animeId = [authenticate, ValidateDto(AnimeIdParamDto, "params")];

animeSuiviRoutes.get('/:id/tracking', ...animeId, suiviController.getSuivi);
animeSuiviRoutes.delete('/:id/tracking', ...animeId, suiviController.deleteSuivi);
animeSuiviRoutes.post('/:id/watchlist', ...animeId, suiviController.addWatchlist);
animeSuiviRoutes.delete('/:id/watchlist', ...animeId, suiviController.removeWatchlist);
animeSuiviRoutes.patch('/:id/progress', ...animeId, ValidateDto(ProgressDto), suiviController.updateProgress);
animeSuiviRoutes.post('/:id/favorite', ...animeId, suiviController.addFavori);
animeSuiviRoutes.delete('/:id/favorite', ...animeId, suiviController.removeFavori);
