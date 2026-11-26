import {Router} from 'express';
import * as authController from "../controllers/auth.controller";
import {ValidateDto} from '../../../../core/http/validations/validate';
import {authenticate} from '../../infra/guards/auth.guard';
import {loginLimiter} from '../../infra/guards/login.limiter';
import {refreshTokenDTO, userLoginDTO} from '../dtos/auth.dto';

const router = Router();

router.post('/login', loginLimiter, ValidateDto(userLoginDTO), authController.login);
router.post('/refresh', ValidateDto(refreshTokenDTO), authController.refresh);
router.post('/logout', authenticate, ValidateDto(refreshTokenDTO), authController.logout);
router.post('/logout-all', authenticate, authController.logoutAll);
router.get('/me', authenticate, authController.me);

export default router;
