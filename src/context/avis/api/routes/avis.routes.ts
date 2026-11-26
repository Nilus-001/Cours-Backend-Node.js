import {Router} from 'express';
import * as avisController from "../controllers/avis.controller";
import {ValidateDto} from '../../../../core/http/validations/validate';
import {authenticate} from '../../../auth/infra/guards/auth.guard';
import {AnimeIdParamDto} from '../../../anime/api/dtos/anime.dto';
import {AvisToCreateDto, AvisToUpdateDto, ReponseToCreateDto} from '../dtos/avis.dto';

const idParam = ValidateDto(AnimeIdParamDto, "params");

export const animeAvisRoutes = Router();

animeAvisRoutes.get('/:id/reviews', idParam, avisController.getAnimeAvis);
animeAvisRoutes.post('/:id/reviews', authenticate, idParam, ValidateDto(AvisToCreateDto), avisController.addAvis);

export const avisRoutes = Router();

avisRoutes.get('/categories', avisController.getCategories);
avisRoutes.get('/:id', idParam, avisController.getAvisById);
avisRoutes.post('/:id/replies', authenticate, idParam, ValidateDto(ReponseToCreateDto), avisController.replyAvis);
avisRoutes.patch('/:id', authenticate, idParam, ValidateDto(AvisToUpdateDto), avisController.updateAvis);
avisRoutes.delete('/:id', authenticate, idParam, avisController.deleteAvis);

export const userAvisRoutes = Router();

userAvisRoutes.get('/reviews', authenticate, avisController.getMesAvis);
