import { Router } from 'express';
import * as animeController from "../controllers/anime.controller";
import { ValidateDto } from '../../../../core/http/validations/validate'
import { animeToCreateDto, animeToUpdateDto, animeIdParamDto } from '../dtos/anime.dto';
import { animeFilterDto } from '../dtos/animeFilter.dto';
import { authenticate } from '../../../auth/infra/guards/auth.guard';
import { requirePermission } from '../../../../core/http/perms/permission.middleware';
import { Perm } from '../../../../core/http/perms/perm.list';

const router = Router()

router.get('/', ValidateDto(animeFilterDto, "query"), animeController.getAnimes);

router.post('/add', authenticate, requirePermission(Perm.CREATE_ANIME), ValidateDto(animeToCreateDto), animeController.addAnime);
router.get('/:id', ValidateDto(animeIdParamDto, "params"), animeController.getAnimeById);
router.patch('/:id/update', authenticate, requirePermission(Perm.EDIT_ANIME), ValidateDto(animeIdParamDto, "params"), ValidateDto(animeToUpdateDto), animeController.updateAnime);
router.delete('/:id/delete', authenticate, requirePermission(Perm.DELETE_ANIME), ValidateDto(animeIdParamDto, "params"), animeController.deleteAnime);

export default router;