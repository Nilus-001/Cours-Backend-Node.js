import { Router } from 'express';
import * as animeController from "../controllers/anime.controller";
import { ValidateDto } from '../../../../core/http/validations/validate'
import { AnimeToCreateDto, AnimeToUpdateDto, AnimeIdParamDto } from '../dtos/anime.dto';
import { AnimeFilterDto } from '../dtos/animeFilter.dto';
import { authenticate } from '../../../auth/infra/guards/auth.guard';
import { requirePermission } from '../../../../core/http/perms/permission.middleware';
import { Perm } from '../../../../core/http/perms/perm.list';

const router = Router()

router.get('/', ValidateDto(AnimeFilterDto, "query"), animeController.getAnimes);

router.post('/add', authenticate, requirePermission(Perm.CREATE_ANIME), ValidateDto(AnimeToCreateDto), animeController.addAnime);
router.get('/:id', ValidateDto(AnimeIdParamDto, "params"), animeController.getAnimeById);
router.patch('/:id/update', authenticate, requirePermission(Perm.EDIT_ANIME), ValidateDto(AnimeIdParamDto, "params"), ValidateDto(AnimeToUpdateDto), animeController.updateAnime);
router.delete('/:id/delete', authenticate, requirePermission(Perm.DELETE_ANIME), ValidateDto(AnimeIdParamDto, "params"), animeController.deleteAnime);

export default router;
