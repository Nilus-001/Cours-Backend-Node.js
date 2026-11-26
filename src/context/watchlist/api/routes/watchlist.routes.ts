import {Router} from 'express';
import * as watchlistController from "../controllers/watchlist.controller";
import {ValidateDto} from '../../../../core/http/validations/validate';
import {authenticate} from '../../../auth/infra/guards/auth.guard';
import {AnimeIdParamDto} from '../../../anime/api/dtos/anime.dto';
import {ProgressDto, WatchlistFilterDto, WatchlistOrderDto} from '../dtos/watchlist.dto';

export const userWatchlistRoutes = Router();

userWatchlistRoutes.get('/watchlist', authenticate, ValidateDto(WatchlistFilterDto, "query"), watchlistController.getWatchlist);
userWatchlistRoutes.patch('/watchlist/order', authenticate, ValidateDto(WatchlistOrderDto), watchlistController.reorderWatchlist);

export const animeWatchlistRoutes = Router();

const animeId = [authenticate, ValidateDto(AnimeIdParamDto, "params")];

animeWatchlistRoutes.get('/:id/tracking', ...animeId, watchlistController.getTracking);
animeWatchlistRoutes.delete('/:id/tracking', ...animeId, watchlistController.deleteTracking);
animeWatchlistRoutes.post('/:id/watchlist', ...animeId, watchlistController.addWatchlist);
animeWatchlistRoutes.delete('/:id/watchlist', ...animeId, watchlistController.removeWatchlist);
animeWatchlistRoutes.patch('/:id/progress', ...animeId, ValidateDto(ProgressDto), watchlistController.updateProgress);
