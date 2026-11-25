import { Router } from 'express';
import * as animeController from "../controllers/anime.controller";
import { ValidateDto } from '../../../../core/http/validations/validate'
import { animeToCreateDto, animeToUpdateDto, animeIdParamDto } from '../dtos/anime.dto';
import { animeFilterDto } from '../dtos/animeFilter.dto';

const router = Router()

router.get('/', ValidateDto(animeFilterDto, "query"), animeController.getAnimes);

router.post('/add', ValidateDto(animeToCreateDto), animeController.addAnime);
router.get('/:id', ValidateDto(animeIdParamDto, "params"), animeController.getAnimeById);
router.patch('/:id/update', ValidateDto(animeIdParamDto, "params"), ValidateDto(animeToUpdateDto), animeController.updateAnime);
router.delete('/:id/delete', ValidateDto(animeIdParamDto, "params"), animeController.deleteAnime);

export default router;