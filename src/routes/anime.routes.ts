import { Router } from 'express';
import * as animeController from "../controllers/anime.controller";
import { ValidateDto } from '../middlewares/validate'
import { animeToCreateDto } from '../types/dtos/anime.dto';

const router = Router()

router.get('/',animeController.getAnimes);

router.post('/add',ValidateDto(animeToCreateDto), animeController.addAnime);
router.get('/:id', animeController.getAnimeById);
router.patch('/:id/update', animeController.updateAnime);
router.delete('/:id/delete', animeController.deleteAnime);

export default router;